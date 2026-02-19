import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;

  // Demo token for Twilio A2P campaign verification
  if (token === "demo") {
    return NextResponse.json({
      introduction: {
        id: "demo",
        candidate_invite_token: "demo",
        matchmaker_name: "Alex",
        candidate_name: "Sam",
        candidate_description:
          "Sam is one of the most genuine people I know — always makes everyone feel welcome and has the best stories.",
        reason_why_great:
          "You both love hiking and trying new restaurants, and I've always thought you'd really hit it off.",
        your_description:
          "Jordan is warm, driven, and always up for an adventure. One of my favorite people.",
        candidate_status: "pending",
        overall_status: "pending",
      },
      single: {
        first_name: "Jordan",
        age: 27,
        gender: "Female",
        city: "San Francisco",
      },
    });
  }

  const supabase = createAdminClient();

  const { data: introduction, error } = await supabase
    .from("introductions")
    .select("*")
    .eq("candidate_invite_token", token)
    .single();

  if (error || !introduction) {
    return NextResponse.json(
      { error: "Introduction not found" },
      { status: 404 }
    );
  }

  // Get the single's basic info for the candidate to see
  const { data: single } = await supabase
    .from("users")
    .select("first_name, age, gender, city")
    .eq("id", introduction.single_id)
    .single();

  return NextResponse.json({
    introduction,
    single: single || { first_name: "Someone special", age: null, gender: null, city: null },
  });
}
