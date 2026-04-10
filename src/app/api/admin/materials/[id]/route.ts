import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["pptx", "video", "image", "pdf", "site"]);

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

function parseId(idStr: string): number | null {
  const n = Number(idStr);
  return Number.isFinite(n) && Number.isInteger(n) ? n : null;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (id === null) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const body = await req.json();
  const updates: Record<string, string> = {};
  if (typeof body.title === "string") updates.title = body.title.trim();
  if (typeof body.url === "string") updates.url = body.url.trim();
  if (typeof body.date === "string") updates.date = body.date;
  if (typeof body.type === "string") {
    if (!ALLOWED_TYPES.has(body.type)) {
      return NextResponse.json({ error: "invalid type" }, { status: 400 });
    }
    updates.type = body.type;
  }

  const { data, error } = await supabase
    .from("materials")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("[admin/materials/:id PATCH]", { id, error, body });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!data) return NextResponse.json({ error: "material을 찾을 수 없습니다" }, { status: 404 });
  return NextResponse.json(data);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: idStr } = await params;
  const id = parseId(idStr);
  if (id === null) return NextResponse.json({ error: "invalid id" }, { status: 400 });

  const { error } = await supabase.from("materials").delete().eq("id", id);
  if (error) {
    console.error("[admin/materials/:id DELETE]", { id, error });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
