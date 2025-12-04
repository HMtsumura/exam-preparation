import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bookId: string }> }
) {
  const backendUrl = `http://backend:8080/api/books/${(await params).bookId}/chapters`;
  const res = await fetch(backendUrl);
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ bookId: string }> }
) {
  const { bookId } = await params;
  const { chapterTitle } = await req.json();

  try {
    const res = await fetch(`http://backend:8080/api/books/${bookId}/chapters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterTitle }),
    });

    if (!res.ok) {
      throw new Error("Spring API への送信に失敗");
    }

    const created = await res.json();
    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "章の追加に失敗しました" }, { status: 500 });
  }
}
