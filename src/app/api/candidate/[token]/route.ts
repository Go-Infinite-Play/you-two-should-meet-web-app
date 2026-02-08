import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params;
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
