import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  // Look up the assignment by invite_token
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

  // Fetch the single's user info
  const { data: single } = await supabase
    .from("users")
    .select("first_name, age, gender, city")
    .eq("id", assignment.single_id)
    .single();

  // Fetch the single's dating preferences
  const { data: profile } = await supabase
    .from("single_profiles")
    .select("interested_in, age_range_min, age_range_max, preference_tags, dealbreaker_tags")
    .eq("user_id", assignment.single_id)
    .single();

  return NextResponse.json({
    assignment,
    single: single || { first_name: "Your friend", age: null, gender: null, city: null },
    profile: profile || {
      interested_in: null,
      age_range_min: null,
      age_range_max: null,
      preference_tags: [],
      dealbreaker_tags: [],
    },
  });
}
