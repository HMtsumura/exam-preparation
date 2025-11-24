
import { NextResponse } from "next/server";

const API_BASE = "http://backend:8080/users";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${API_BASE}/${params.id}`);
  const data = await res.json();
  return NextResponse.json(data);
}