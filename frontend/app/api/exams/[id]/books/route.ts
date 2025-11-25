import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = `http://backend:8080/api/exams/${(await params).id}/books`;
  const res = await fetch(backendUrl);
  const data = await res.json();

  return NextResponse.json(data);
}
