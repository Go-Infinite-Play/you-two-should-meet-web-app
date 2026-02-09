import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  // Look up the assignment by invite_token where created_by_matchmaker = true
  const { data: assignment, error: assignmentError } = await supabase
    .from("matchmaker_assignments")
    .select("*")
    .eq("invite_token", token)
    .single();

  if (assignmentError || !assignment) {
    return NextResponse.json(
      { error: "Invitation not found or has expired" },
      { status: 404 }
    );
  }

  // Fetch the matchmaker's info
  let matchmakerName = assignment.matchmaker_name;
  if (assignment.matchmaker_user_id) {
    const { data: matchmaker } = await supabase
      .from("users")
      .select("first_name")
      .eq("id", assignment.matchmaker_user_id)
      .single();

    if (matchmaker) {
      matchmakerName = matchmaker.first_name;
    }
  }

  // Fetch the single's info
  const { data: single } = await supabase
    .from("users")
    .select("first_name")
    .eq("id", assignment.single_id)
    .single();

  return NextResponse.json({
    matchmakerName,
    singleName: single?.first_name || "You",
    relationship: assignment.relationship || null,
  });
}
