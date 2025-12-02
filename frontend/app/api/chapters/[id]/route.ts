import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const backendUrl = `http://backend:8080/api/chapters/${(await params).id}`;
 
  try {
    const res = await fetch(backendUrl, { method: "DELETE" });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to delete chapter" },
        { status: res.status }
      );
    }

    return NextResponse.json({ message: "Chapter deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: "Delete request failed" },
      { status: 500 }
    );
  }
}
