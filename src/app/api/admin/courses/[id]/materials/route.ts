import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const ALLOWED_TYPES = new Set(["pptx", "video", "image", "pdf", "site"]);

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: courseId } = await params;
  const body = await req.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const type = typeof body.type === "string" && ALLOWED_TYPES.has(body.type) ? body.type : "pptx";
  const url = typeof body.url === "string" ? body.url.trim() : "";
  const date = typeof body.date === "string" && body.date
    ? body.date
    : new Date().toISOString().split("T")[0];

  // sort_order = 기존 최댓값 + 1 (없으면 0)
  const { data: last, error: selErr } = await supabase
    .from("materials")
    .select("sort_order")
    .eq("course_id", courseId)
    .order("sort_order", { ascending: false })
    .limit(1);
  if (selErr) {
    console.error("[admin/courses/:id/materials POST select]", { courseId, error: selErr });
    return NextResponse.json({ error: selErr.message }, { status: 500 });
  }
  const nextOrder = last && last.length > 0 ? last[0].sort_order + 1 : 0;

  const { data, error } = await supabase
    .from("materials")
    .insert({ course_id: courseId, title, type, url, date, sort_order: nextOrder })
    .select()
    .single();

  if (error) {
    console.error("[admin/courses/:id/materials POST insert]", { courseId, error, body });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data, { status: 201 });
}
