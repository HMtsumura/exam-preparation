import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = `http://backend:8080/api/books/${(await params).id}/chapters`;
  const res = await fetch(backendUrl);
  const data = await res.json();

  return NextResponse.json(data);
}
