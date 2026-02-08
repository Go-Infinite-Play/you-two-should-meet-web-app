import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { toE164 } from "@/lib/format-phone";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  const body = await request.json();
  const {
    candidate_name,
    candidate_phone,
    candidate_description,
    reason_why_great,
    your_description,
  } = body;

  if (!candidate_name || !candidate_phone || !candidate_description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Look up the assignment
  const { data: assignment, error: assignmentError } = await supabase
    .from("matchmaker_assignments")
    .select("*")
    .eq("invite_token", token)
    .in("status", ["opened", "looking"])
    .single();

  if (assignmentError || !assignment) {
    return NextResponse.json(
      { error: "Assignment not found or already submitted" },
      { status: 404 }
    );
  }

  const candidateInviteToken = crypto.randomUUID();

  // Create the introduction
  const { data: introduction, error: introError } = await supabase
    .from("introductions")
    .insert({
      assignment_id: assignment.id,
      single_id: assignment.single_id,
      matchmaker_name: assignment.matchmaker_name,
      candidate_name,
      candidate_phone: toE164(candidate_phone),
      candidate_description,
      reason_why_great: reason_why_great || "",
      your_description: your_description || "",
      single_status: "pending",
      candidate_status: "pending",
      overall_status: "pending",
      candidate_invite_token: candidateInviteToken,
    })
    .select()
    .single();

  if (introError) {
    console.error("Failed to create introduction:", introError);
    return NextResponse.json(
      { error: "Failed to create introduction" },
      { status: 500 }
    );
  }

  // Update assignment status
  await supabase
    .from("matchmaker_assignments")
    .update({ status: "found_someone" })
    .eq("id", assignment.id);

  // Insert activity event for the single
  await supabase.from("activity_events").insert({
    user_id: assignment.single_id,
    icon: "sparkles",
    title: `${assignment.matchmaker_name} found someone!`,
    subtitle: "They think you'd really hit it off",
  });

  // Trigger SMS to candidate (fire-and-forget)
  try {
    await supabase.functions.invoke("send-candidate-sms", {
      body: {
        introduction_id: introduction.id,
        candidate_name,
        candidate_phone: toE164(candidate_phone),
        candidate_invite_token: candidateInviteToken,
        matchmaker_name: assignment.matchmaker_name,
      },
    });
  } catch (smsError) {
    console.error("SMS send failed:", smsError);
  }

  return NextResponse.json({ success: true, introduction });
}
