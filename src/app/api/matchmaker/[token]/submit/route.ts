import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";
import { toE164 } from "@/lib/format-phone";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (token === "demo") {
    return NextResponse.json({ success: true, introduction: { id: "demo" } });
  }
  const supabase = createAdminClient();

  const body = await request.json();
  const {
    candidate_name,
    candidate_phone,
    candidate_description,
    reason_why_great,
    your_description,
    matchmaker_phone,
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

  // 6b. Create or find matchmaker user
  let matchmakerUserId = assignment.matchmaker_user_id;
  if (!matchmakerUserId && matchmaker_phone) {
    const { data: matchmakerUser } = await supabase
      .from("users")
      .upsert(
        {
          phone: toE164(matchmaker_phone),
          first_name: assignment.matchmaker_name,
          role: "matchmaker",
        },
        { onConflict: "phone" }
      )
      .select("id")
      .single();

    if (matchmakerUser) {
      matchmakerUserId = matchmakerUser.id;
    }
  }

  const candidateInviteToken = crypto.randomUUID();

  // 6a. Update assignment status + matchmaker_user_id
  await supabase
    .from("matchmaker_assignments")
    .update({
      status: "found_someone",
      ...(matchmakerUserId ? { matchmaker_user_id: matchmakerUserId } : {}),
    })
    .eq("id", assignment.id);

  // 6c. Create the introduction
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

  // 6d. Insert activity event for the single
  await supabase.from("activity_events").insert({
    user_id: assignment.single_id,
    icon: "sparkles",
    title: "New introduction!",
    subtitle: `${assignment.matchmaker_name} found someone for you`,
  });

  // 6e. Send push notification to single (fire-and-forget)
  try {
    await supabase.functions.invoke("send-push", {
      body: {
        user_id: assignment.single_id,
        type: "matchmaker_found_someone",
        data: { matchmaker_name: assignment.matchmaker_name },
      },
    });
  } catch {
    // Don't fail if push fails
  }

  // 6f. Award matchmaker points (fire-and-forget)
  if (matchmakerUserId) {
    try {
      await supabase.functions.invoke("award-points", {
        body: {
          matchmaker_user_id: matchmakerUserId,
          event: "propose_match",
        },
      });
    } catch {
      // Don't fail if points award fails
    }
  }

  // 6g. Send SMS to candidate via edge function
  try {
    await supabase.functions.invoke("send-candidate-sms", {
      body: { introduction_id: introduction.id },
    });
  } catch (smsError) {
    console.error("send-candidate-sms failed, falling back to direct send:", smsError);

    // Fallback: send directly via Twilio if edge function fails
    try {
      const twilio = (await import("twilio")).default;
      const twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID!,
        process.env.TWILIO_AUTH_TOKEN!
      );

      const candidateLink = `https://youtwoshouldmeet.app/c/${candidateInviteToken}`;
      const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;

      await twilioClient.messages.create({
        to: toE164(candidate_phone),
        body: `Hey ${candidate_name}! ${assignment.matchmaker_name} thinks you'd be great for a friend of theirs. See what they said: ${candidateLink}\n\nReply STOP to opt out.`,
        ...(messagingServiceSid
          ? { messagingServiceSid }
          : { from: process.env.TWILIO_FROM_NUMBER! }),
      });

      try {
        await supabase.from("sms_log").insert({
          to_phone: toE164(candidate_phone),
          from_phone: process.env.TWILIO_FROM_NUMBER,
          message_type: "candidate_invite",
          status: "sent",
        });
      } catch {
        // Don't fail if sms_log insert fails
      }
    } catch (fallbackError) {
      console.error("Fallback SMS send also failed:", fallbackError);
    }
  }

  return NextResponse.json({ success: true, introduction });
}
