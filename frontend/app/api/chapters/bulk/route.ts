import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { bookId, titles } = await req.json();

  const res = await fetch(`http://backend:8080/api/chapters/bulk`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookId, titles }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
