import { NextResponse } from "next/server";
import { getMaterials } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMaterials();
    return NextResponse.json(data);
  } catch {
    // Blob not configured — return fallback from local JSON
    return NextResponse.json({ password: "onadot2026", courses: [] });
  }
}
