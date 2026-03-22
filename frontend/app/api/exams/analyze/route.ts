import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { examName, dailyStudyHours } = await request.json();

    if (!examName || !dailyStudyHours) {
      return NextResponse.json(
        { error: "試験名と1日の学習時間が必要です" },
        { status: 400 }
      );
    }

    // Spring Bootのバックエンドに処理を委譲
    // Docker Compose内では `api` サービスホストを使用
    const url = "http://api:8080/api/exams/analyze";
    console.log("Calling backend at:", url);
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        examName,
        dailyStudyHours,
      }),
    });

    console.log("Backend response status:", response.status);

    if (!response.ok) {
      const error = await response.text();
      console.error("Backend Error:", error);
      return NextResponse.json(
        { error: `バックエンドエラー: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("Backend data received:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in route:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `サーバーエラー: ${errorMessage}` },
      { status: 500 }
    );
  }
}
