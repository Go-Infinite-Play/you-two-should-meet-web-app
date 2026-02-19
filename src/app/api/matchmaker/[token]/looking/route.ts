import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  if (token === "demo") return NextResponse.json({ success: true });
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("matchmaker_assignments")
    .update({ status: "looking" })
    .eq("invite_token", token)
    .in("status", ["opened", "looking"])
    .select("id, single_id, matchmaker_name")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }

  if (data) {
    await supabase.from("activity_events").insert({
      user_id: data.single_id,
      icon: "eyes",
      title: `${data.matchmaker_name} is looking`,
      subtitle: "They're thinking of someone for you",
    });

    // Send push notification to single (fire-and-forget)
    try {
      await supabase.functions.invoke("send-push", {
        body: {
          user_id: data.single_id,
          type: "matchmaker_looking",
          data: { matchmaker_name: data.matchmaker_name },
        },
      });
    } catch {
      // Don't fail if push fails
    }
  }

  return NextResponse.json({ success: true });
}
