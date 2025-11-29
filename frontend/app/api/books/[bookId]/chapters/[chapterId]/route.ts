import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookId: string, chapterId: string }> }
) {
const { bookId, chapterId } = await params;
  const backendUrl = `http://backend:8080/api/books/${bookId}/chapters/${chapterId}`;
  const res = await fetch(backendUrl);
  const data = await res.json();

  return NextResponse.json(data);
}
