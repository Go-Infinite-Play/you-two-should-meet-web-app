import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Handle demo token for Twilio A2P campaign verification
  if (token === "demo") {
    return NextResponse.json({
      demo: true,
      other_person_name: "Rachel",
      why_great_match:
        "She loves hiking, has a great sense of humor, and her mother says she makes the best challah this side of Brooklyn.",
      yenta_name: "Mrs. Goldberg",
      person_side: "a",
      their_status: "pending",
      other_status: "pending",
      overall_status: "pending",
    });
  }

  const supabase = createAdminClient();

  // Look up match by either token
  const { data: match, error } = await supabase
    .from("matches")
    .select("*")
    .or(`person_a_token.eq.${token},person_b_token.eq.${token}`)
    .single();

  if (error || !match) {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }

  const isPersonA = match.person_a_token === token;

  // Get the suggestion for the "why great match" text
  const { data: suggestion } = await supabase
    .from("match_suggestions")
    .select("why_great_match, suggesting_yenta_id")
    .eq("id", match.suggestion_id)
    .single();

  // Get yenta name
  let yentaName = "A very enthusiastic matchmaker";
  if (suggestion?.suggesting_yenta_id) {
    const { data: yenta } = await supabase
      .from("users")
      .select("first_name")
      .eq("id", suggestion.suggesting_yenta_id)
      .single();
    if (yenta) yentaName = yenta.first_name;
  }

  return NextResponse.json({
    other_person_name: isPersonA ? match.person_b_name : match.person_a_name,
    why_great_match: suggestion?.why_great_match || "",
    yenta_name: yentaName,
    person_side: isPersonA ? "a" : "b",
    their_status: isPersonA
      ? match.person_a_status
      : match.person_b_status,
    other_status: isPersonA
      ? match.person_b_status
      : match.person_a_status,
    overall_status: match.overall_status,
    other_phone:
      match.overall_status === "matched"
        ? isPersonA
          ? match.person_b_phone
          : match.person_a_phone
        : undefined,
  });
}
