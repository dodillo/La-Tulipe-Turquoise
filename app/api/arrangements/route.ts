import { supabase } from "@/lib/supabase-client"
import { NextResponse } from "next/server"

export async function GET() {
  const { data, error } = await supabase.from("arrangements").select("*").limit(12)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
