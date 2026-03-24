import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "regshield-ai",
    timestamp: new Date().toISOString(),
  });
}
