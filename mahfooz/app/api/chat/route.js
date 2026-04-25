import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      message: "Chat API is not implemented yet. Connect this route to Groq in the next build phase.",
    },
    { status: 501 },
  );
}
