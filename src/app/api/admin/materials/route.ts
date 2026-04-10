import { NextRequest, NextResponse } from "next/server";
import { supabase, type CourseWithMaterials } from "@/lib/supabase";

function checkAuth(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: courses, error: cErr } = await supabase
    .from("courses")
    .select("*")
    .order("created_at");
  if (cErr) {
    console.error("[admin/materials GET courses]", cErr);
    return NextResponse.json({ error: cErr.message }, { status: 500 });
  }

  const { data: materials, error: mErr } = await supabase
    .from("materials")
    .select("*")
    .order("sort_order");
  if (mErr) {
    console.error("[admin/materials GET materials]", mErr);
    return NextResponse.json({ error: mErr.message }, { status: 500 });
  }

  const result: CourseWithMaterials[] = (courses || []).map((c) => ({
    ...c,
    materials: (materials || []).filter((m) => m.course_id === c.id),
  }));

  return NextResponse.json({ courses: result });
}
