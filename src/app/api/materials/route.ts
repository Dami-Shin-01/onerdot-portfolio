import { NextResponse } from "next/server";
import { supabase, type CourseWithMaterials } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data: courses } = await supabase.from("courses").select("*").order("created_at");
  const { data: materials } = await supabase.from("materials").select("*").order("sort_order");

  const result: CourseWithMaterials[] = (courses || []).map((c) => ({
    ...c,
    materials: (materials || []).filter((m) => m.course_id === c.id),
  }));

  return NextResponse.json({ password: "onadot2026", courses: result });
}
