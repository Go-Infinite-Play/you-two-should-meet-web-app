import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (token === "demo") {
    return NextResponse.json({ success: true, isMutualMatch: false });
  }
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

  // Look up matchmaker_user_id for points (needed in both branches)
  let matchmakerUserId: string | null = null;
  try {
    const { data: assignment } = await supabase
      .from("matchmaker_assignments")
      .select("matchmaker_user_id")
      .eq("id", introduction.assignment_id)
      .single();
    matchmakerUserId = assignment?.matchmaker_user_id || null;
  } catch {
    // Non-critical
  }

  let connection = null;

  if (isMutualMatch) {
    // MUTUAL MATCH — both said yes!

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
          match_description: introduction.candidate_description,
          reason_why_great: introduction.reason_why_great,
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

    // Award points — mutual_match
    if (matchmakerUserId) {
      try {
        await supabase.functions.invoke("award-points", {
          body: {
            matchmaker_user_id: matchmakerUserId,
            event: "mutual_match",
          },
        });
      } catch {
        // Don't fail if points award fails
      }
    }
  } else {
    // CANDIDATE ACCEPTED — single hasn't responded yet

    // Activity event
    await supabase.from("activity_events").insert({
      user_id: introduction.single_id,
      icon: "eyes",
      title: `${introduction.candidate_name} is interested!`,
      subtitle: `Open the app to see the introduction from ${introduction.matchmaker_name}`,
    });

    // Send push to single
    try {
      await supabase.functions.invoke("send-push", {
        body: {
          user_id: introduction.single_id,
          type: "candidate_accepted",
          data: { candidate_name: introduction.candidate_name },
        },
      });
    } catch {
      // Don't fail if push fails
    }

    // Award points — candidate_accepted
    if (matchmakerUserId) {
      try {
        await supabase.functions.invoke("award-points", {
          body: {
            matchmaker_user_id: matchmakerUserId,
            event: "candidate_accepted",
          },
        });
      } catch {
        // Don't fail if points award fails
      }
    }
  }

  return NextResponse.json({
    success: true,
    introduction: updated,
    connection,
    isMutualMatch,
  });
}
