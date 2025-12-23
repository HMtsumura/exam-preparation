import { NextResponse } from "next/server";

export async function POST(req: Request) {
　const { examName, examDate, estimatedDailyStudyHours } = await req.json();
  try {
    const res = await fetch(`http://backend:8080/api/exams`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
            examName,
            examDate,
            estimatedDailyStudyHours,
        }),
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

export async function GET(
  req: Request,
) {
    const res = await fetch(`http://backend:8080/api/exams`);
    const data = await res.json();
    return NextResponse.json(data);
}