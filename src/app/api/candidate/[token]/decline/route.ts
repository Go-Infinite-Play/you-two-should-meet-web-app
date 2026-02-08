import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
  const supabase = createAdminClient();

  const { data: introduction, error } = await supabase
    .from("introductions")
    .select("id, candidate_status")
    .eq("candidate_invite_token", token)
    .eq("candidate_status", "pending")
    .single();

  if (error || !introduction) {
    return NextResponse.json(
      { error: "Introduction not found or already responded" },
      { status: 404 }
    );
  }

  await supabase
    .from("introductions")
    .update({
      candidate_status: "declined",
      overall_status: "declined",
    })
    .eq("id", introduction.id);

  return NextResponse.json({ success: true });
}
