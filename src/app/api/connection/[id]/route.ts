import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-server";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = createAdminClient();

  const { data: connection, error } = await supabase
    .from("connections")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !connection) {
    return NextResponse.json(
      { error: "Connection not found" },
      { status: 404 }
    );
  }

  // Get the single's info
  const { data: single } = await supabase
    .from("users")
    .select("first_name, phone")
    .eq("id", connection.single_id)
    .single();

  return NextResponse.json({
    connection,
    single: single || { first_name: "Your match", phone: null },
  });
}
