import { NextRequest, NextResponse } from "next/server";
import { getMaterials, saveMaterials, type MaterialsData } from "@/lib/blob-store";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await getMaterials();
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body: MaterialsData = await req.json();
  await saveMaterials(body);
  return NextResponse.json({ success: true });
}
