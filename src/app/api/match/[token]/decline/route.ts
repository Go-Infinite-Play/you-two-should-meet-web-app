import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Handle demo token
  if (token === "demo") {
    return NextResponse.json({ success: true });
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

  // Don't allow double-decline
  if (myStatus !== "pending") {
    return NextResponse.json(
      { error: "Already responded to this match" },
      { status: 400 }
    );
  }

  // Build the update payload
  const updatePayload: Record<string, string> = {
    overall_status: "declined",
  };
  if (isPersonA) {
    updatePayload.person_a_status = "declined";
  } else {
    updatePayload.person_b_status = "declined";
  }

  await supabase
    .from("matches")
    .update(updatePayload)
    .eq("id", match.id);

  return NextResponse.json({ success: true });
}
