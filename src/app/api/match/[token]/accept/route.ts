import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Handle demo token
  if (token === "demo") {
    return NextResponse.json({ success: true, isMutualMatch: false });
  }

  const supabase = createAdminClient();

  // Look up match by either token
  const { data: match, error } = await supabase
    .from("matches")
    .select("*")
    .or(`person_a_token.eq.${token},person_b_token.eq.${token}`)
    .single();

  if (error || !match) {
    return NextResponse.json(
      { error: "Match not found" },
      { status: 404 }
    );
  }

  const isPersonA = match.person_a_token === token;
  const myStatus = isPersonA
    ? match.person_a_status
    : match.person_b_status;

  // Don't allow double-accept
  if (myStatus !== "pending") {
    return NextResponse.json(
      { error: "Already responded to this match" },
      { status: 400 }
    );
  }

  const otherStatus = isPersonA
    ? match.person_b_status
    : match.person_a_status;
  const isMutualMatch = otherStatus === "accepted";
  const newOverallStatus = isMutualMatch ? "matched" : "pending";

  // Build the update payload
  const updatePayload: Record<string, string> = {
    overall_status: newOverallStatus,
  };
  if (isPersonA) {
    updatePayload.person_a_status = "accepted";
  } else {
    updatePayload.person_b_status = "accepted";
  }

  const { data: updated } = await supabase
    .from("matches")
    .update(updatePayload)
    .eq("id", match.id)
    .select()
    .single();

  return NextResponse.json({
    success: true,
    match: updated,
    isMutualMatch,
    other_phone: isMutualMatch
      ? isPersonA
        ? match.person_b_phone
        : match.person_a_phone
      : undefined,
    other_person_name: isPersonA
      ? match.person_b_name
      : match.person_a_name,
  });
}
