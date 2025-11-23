// pages/api/test.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export async function GET() {
  const res = await fetch("http://backend:8080/health");
  const data = await res.json();
  return Response.json(data);
}
