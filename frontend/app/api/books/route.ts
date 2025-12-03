import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { examId, name } = await req.json();

  try {
    const res = await fetch(`http://backend:8080/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examId, name }),
    });

    if (!res.ok) {
      throw new Error("Spring API への送信に失敗");
    }

    const created = await res.json();
    return NextResponse.json(created);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "参考書の追加に失敗しました" }, { status: 500 });
  }
}