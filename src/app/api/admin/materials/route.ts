import { NextRequest, NextResponse } from "next/server";
import { supabase, type CourseWithMaterials } from "@/lib/supabase";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: courses, error: cErr } = await supabase.from("courses").select("*").order("created_at");
  if (cErr) return NextResponse.json({ error: cErr.message }, { status: 500 });

  const { data: materials, error: mErr } = await supabase.from("materials").select("*").order("sort_order");
  if (mErr) return NextResponse.json({ error: mErr.message }, { status: 500 });

  const result: CourseWithMaterials[] = (courses || []).map((c) => ({
    ...c,
    materials: (materials || []).filter((m) => m.course_id === c.id),
  }));

  return NextResponse.json({ courses: result });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const courses: CourseWithMaterials[] = body.courses || [];

  // Upsert courses
  for (const course of courses) {
    const { materials, ...courseData } = course;
    await supabase.from("courses").upsert(courseData);

    // Replace materials for this course
    await supabase.from("materials").delete().eq("course_id", course.id);
    if (materials && materials.length > 0) {
      const materialsWithCourse = materials.map((m, i) => ({
        course_id: course.id,
        title: m.title,
        type: m.type,
        url: m.url,
        date: m.date,
        sort_order: i,
      }));
      await supabase.from("materials").insert(materialsWithCourse);
    }
  }

  // Delete courses not in the update
  const courseIds = courses.map((c) => c.id);
  if (courseIds.length > 0) {
    await supabase.from("courses").delete().not("id", "in", `(${courseIds.join(",")})`);
  }

  return NextResponse.json({ success: true });
}
