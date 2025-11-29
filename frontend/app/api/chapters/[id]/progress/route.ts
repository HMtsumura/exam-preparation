import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { progress } = await req.json();
  

  try {
    const res = await fetch(`http://backend:8080/api/chapters/${id}/progress`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress }),
    });

    if (!res.ok) {
      throw new Error("Spring API への送信に失敗");
    }

    const updated = await res.json();
    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "進捗率の更新に失敗しました" }, { status: 500 });
  }
}
