"use client";

import { useState, useEffect } from "react";
import PasswordGate from "@/components/PasswordGate";

interface MaterialItem {
  title: string;
  type: string;
  url: string;
  date: string;
}

interface MaterialCourse {
  id: string;
  title: string;
  description: string;
  materials: MaterialItem[];
}

interface MaterialsData {
  password: string;
  courses: MaterialCourse[];
}

const typeIcons: Record<string, string> = {
  pptx: "📊",
  ppt: "📊",
  image: "🖼️",
  site: "🌐",
  video: "🎬",
  pdf: "📄",
};

const typeLabels: Record<string, string> = {
  pptx: "PPT",
  ppt: "PPT",
  image: "이미지",
  video: "영상",
  pdf: "PDF",
  site: "사이트",
};

export default function MaterialsContent() {
  const [data, setData] = useState<MaterialsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeCourse, setActiveCourse] = useState("");

  useEffect(() => {
    fetch("/api/blog") // just to check if blob is configured
      .catch(() => {});

    // Fetch materials from API
    fetch("/api/admin/materials", {
      headers: { "x-admin-password": "__public__" },
    })
      .then(() => {
        // Public route needed — let's fetch directly
      })
      .catch(() => {});

    // For now, try fetching from a public endpoint
    fetch("/api/materials")
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        if (d) {
          setData(d);
          if (d.courses.length > 0) setActiveCourse(d.courses[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
        <p className="text-sm text-[var(--color-warm-gray)]">로딩 중...</p>
      </div>
    );
  }

  if (!data || data.courses.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-cream)]">
        <p className="text-sm text-[var(--color-warm-gray)]">등록된 강의자료가 없습니다.</p>
      </div>
    );
  }

  const currentCourse = data.courses.find((c) => c.id === activeCourse);

  return (
    <PasswordGate correctPassword={data.password}>
      <div className="min-h-screen bg-[var(--color-cream)]">
        <header className="border-b border-[var(--color-warm-gray)]/20">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-12">
            <a href="/" className="font-serif-en text-xl tracking-[-0.02em] text-[var(--color-headline)]">
              On a DoT
            </a>
            <span className="text-sm text-[var(--color-warm-gray)]">강의자료실</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-12">
          <div className="mb-10 flex flex-wrap gap-3">
            {data.courses.map((course) => (
              <button
                key={course.id}
                onClick={() => setActiveCourse(course.id)}
                className={`rounded-[2px] border px-5 py-2.5 text-sm transition-colors ${
                  activeCourse === course.id
                    ? "border-[var(--color-terracotta)] bg-[var(--color-terracotta)] text-[var(--color-cream)]"
                    : "border-[var(--color-warm-gray)]/30 text-[var(--color-charcoal)] hover:border-[var(--color-terracotta)] hover:text-[var(--color-terracotta)]"
                }`}
              >
                {course.title}
              </button>
            ))}
          </div>

          {currentCourse && (
            <>
              <div className="mb-8">
                <h1 className="font-serif-kr text-[1.75rem] text-[var(--color-headline)] lg:text-[2rem]">
                  {currentCourse.title}
                </h1>
                <p className="mt-2 text-base text-[var(--color-warm-gray)]">
                  {currentCourse.description}
                </p>
              </div>

              <div className="space-y-0">
                {currentCourse.materials.map((material, index) => {
                  const isExternal = material.url.startsWith("http");
                  return (
                    <a
                      key={index}
                      href={material.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 border-b border-[var(--color-warm-gray)]/15 px-4 py-5 transition-colors hover:bg-[var(--color-warm-gray)]/5"
                    >
                      <span className="text-xl" aria-hidden="true">
                        {typeIcons[material.type] || "📁"}
                      </span>
                      <div className="flex-1">
                        <p className="text-base text-[var(--color-charcoal)] group-hover:text-[var(--color-terracotta)]">
                          {material.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">{material.date}</p>
                      </div>
                      <span className="rounded-[2px] border border-[var(--color-warm-gray)]/20 px-2.5 py-1 text-xs text-[var(--color-warm-gray)]">
                        {typeLabels[material.type] || material.type.toUpperCase()}
                      </span>
                      <span className="text-sm text-[var(--color-warm-gray)] group-hover:text-[var(--color-terracotta)]">
                        {isExternal ? "→" : "↓"}
                      </span>
                    </a>
                  );
                })}
              </div>

              {currentCourse.materials.length === 0 && (
                <p className="py-12 text-center text-sm text-[var(--color-warm-gray)]">
                  아직 등록된 자료가 없습니다.
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </PasswordGate>
  );
}
