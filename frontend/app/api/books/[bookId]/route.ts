import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const backendUrl = `http://backend:8080/api/books/${(await params).bookId}`;
  const res = await fetch(backendUrl);

  if (!res.ok) {
    const text = await res.text();
    console.error("Backend error:", res.status, text);

    return NextResponse.json(
      {
        error: "Backend error",
        status: res.status,
        details: text,
      },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json(data);
}
