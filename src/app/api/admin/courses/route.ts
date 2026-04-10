import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const description = typeof body.description === "string" ? body.description.trim() : "";
  if (!title) return NextResponse.json({ error: "title은 필수입니다" }, { status: 400 });

  const id = "course-" + Date.now().toString(36);
  const { data, error } = await supabase
    .from("courses")
    .insert({ id, title, description })
    .select()
    .single();

  if (error) {
    console.error("[admin/courses POST]", { error, body });
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ...data, materials: [] }, { status: 201 });
}
