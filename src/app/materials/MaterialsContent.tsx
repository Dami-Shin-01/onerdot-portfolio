"use client";

import { useState } from "react";
import PasswordGate from "@/components/PasswordGate";
import materialsData from "../../../content/materials.json";

const typeIcons: Record<string, string> = {
  pptx: "📊",
  ppt: "📊",
  image: "🖼️",
  video: "🎬",
  pdf: "📄",
};

const typeLabels: Record<string, string> = {
  pptx: "PPT",
  ppt: "PPT",
  image: "이미지",
  video: "영상",
  pdf: "PDF",
};

export default function MaterialsContent() {
  const [activeCourse, setActiveCourse] = useState(materialsData.courses[0]?.id || "");

  const currentCourse = materialsData.courses.find((c) => c.id === activeCourse);

  return (
    <PasswordGate correctPassword={materialsData.password}>
      <div className="min-h-screen bg-[var(--color-cream)]">
        {/* Header */}
        <header className="border-b border-[var(--color-warm-gray)]/20">
          <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-12">
            <a href="/" className="font-serif-en text-xl tracking-[-0.02em] text-[var(--color-headline)]">
              On a DoT
            </a>
            <span className="text-sm text-[var(--color-warm-gray)]">강의자료실</span>
          </div>
        </header>

        <div className="mx-auto max-w-[1200px] px-6 py-12 lg:px-12">
          {/* Course Tabs */}
          <div className="mb-10 flex flex-wrap gap-3">
            {materialsData.courses.map((course) => (
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

          {/* Course Info */}
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

              {/* Materials List */}
              <div className="space-y-0">
                {currentCourse.materials.map((material, index) => {
                  const isExternal = material.url.startsWith("http");
                  return (
                    <a
                      key={index}
                      href={material.url}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      download={!isExternal ? true : undefined}
                      className="group flex items-center gap-4 border-b border-[var(--color-warm-gray)]/15 px-4 py-5 transition-colors hover:bg-[var(--color-warm-gray)]/5"
                    >
                      <span className="text-xl" aria-hidden="true">
                        {typeIcons[material.type] || "📁"}
                      </span>
                      <div className="flex-1">
                        <p className="text-base text-[var(--color-charcoal)] group-hover:text-[var(--color-terracotta)]">
                          {material.title}
                        </p>
                        <p className="mt-0.5 text-xs text-[var(--color-warm-gray)]">
                          {material.date}
                        </p>
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
