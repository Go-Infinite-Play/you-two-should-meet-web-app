import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  // Only update if still in 'notified' status (idempotent)
  const { data, error } = await supabase
    .from("matchmaker_assignments")
    .update({ status: "opened" })
    .eq("invite_token", token)
    .eq("status", "notified")
    .select("id, single_id, matchmaker_name")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  // Insert activity event for the single's feed
  if (data) {
    await supabase.from("activity_events").insert({
      user_id: data.single_id,
      icon: "envelope.open",
      title: `${data.matchmaker_name} opened your invite`,
      subtitle: "They're checking out what you're looking for",
    });
  }

  return NextResponse.json({ success: true });
}
