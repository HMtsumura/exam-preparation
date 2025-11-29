import { NextResponse } from "next/server";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { durationMinutes, notes } = await req.json();

  try {
    const res = await fetch(`http://backend:8080/api/chapters/${id}/study_logs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ durationMinutes, notes }),
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
