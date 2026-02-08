import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  // Find the introduction
  const { data: introduction, error } = await supabase
    .from("introductions")
    .select("*")
    .eq("candidate_invite_token", token)
    .eq("candidate_status", "pending")
    .single();

  if (error || !introduction) {
    return NextResponse.json(
      { error: "Introduction not found or already responded" },
      { status: 404 }
    );
  }

  // Determine new overall status
  const isMutualMatch = introduction.single_status === "accepted";
  const newOverallStatus = isMutualMatch ? "mutual_match" : "candidate_accepted";

  // Update candidate status
  const { data: updated } = await supabase
    .from("introductions")
    .update({
      candidate_status: "accepted",
      overall_status: newOverallStatus,
    })
    .eq("id", introduction.id)
    .select()
    .single();

  let connection = null;

  // If mutual match, create connection
  if (isMutualMatch) {
    // Get single's info for the connection
    const { data: single } = await supabase
      .from("users")
      .select("first_name, phone")
      .eq("id", introduction.single_id)
      .single();

    if (single) {
      const { data: conn } = await supabase
        .from("connections")
        .insert({
          introduction_id: introduction.id,
          single_id: introduction.single_id,
          match_name: introduction.candidate_name,
          match_phone: introduction.candidate_phone,
          matchmaker_name: introduction.matchmaker_name,
        })
        .select()
        .single();

      connection = conn;
    }

    // Activity event for the single
    await supabase.from("activity_events").insert({
      user_id: introduction.single_id,
      icon: "heart.circle.fill",
      title: "It's a match!",
      subtitle: `${introduction.matchmaker_name} connected you with ${introduction.candidate_name}`,
    });

    // Award points to matchmaker (fire-and-forget)
    try {
      const { data: assignment } = await supabase
        .from("matchmaker_assignments")
        .select("matchmaker_user_id")
        .eq("id", introduction.assignment_id)
        .single();

      if (assignment?.matchmaker_user_id) {
        await supabase.functions.invoke("award-points", {
          body: {
            matchmaker_user_id: assignment.matchmaker_user_id,
            event: "mutual_match",
          },
        });
      }
    } catch {
      // Don't fail if points award fails
    }
  } else {
    // Candidate accepted but single hasn't decided yet
    await supabase.from("activity_events").insert({
      user_id: introduction.single_id,
      icon: "bell.badge",
      title: `${introduction.candidate_name} is interested!`,
      subtitle: `${introduction.matchmaker_name}'s recommendation said yes`,
    });
  }

  return NextResponse.json({
    success: true,
    introduction: updated,
    connection,
    isMutualMatch,
  });
}
