import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      message: "Progress API is not implemented yet. Supabase integration will be added in a later phase.",
    },
    { status: 501 },
  );
}
