
import { NextResponse } from "next/server";

const API_BASE = "http://backend:8080/api/exams";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const res = await fetch(`${API_BASE}/${(await params).id}`);
    const data = await res.json();
    return NextResponse.json(data);
}