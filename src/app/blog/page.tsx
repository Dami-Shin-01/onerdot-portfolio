import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "블로그 | On a DoT",
  description: "AI에 대한 쉬운 이야기들을 나눕니다.",
};

// Placeholder data - will be replaced with Contentlayer
const posts = [
  {
    slug: "ai-basics-for-beginners",
    title: "비전공자를 위한 AI 기초 가이드",
    summary:
      "AI가 뭔지 모르겠다면 여기서 시작하세요. 기술 용어 없이 설명하는 인공지능의 기본 개념.",
    date: "2026.03.15",
    tags: ["AI 기초", "비전공자"],
  },
  {
    slug: "chatgpt-prompt-tips",
    title: "ChatGPT 프롬프트 작성법 5가지",
    summary:
      "같은 질문도 어떻게 하느냐에 따라 답이 달라집니다. 효과적인 프롬프트 작성의 핵심 원칙을 알려드립니다.",
    date: "2026.03.08",
    tags: ["ChatGPT", "프롬프트"],
  },
  {
    slug: "ai-automation-workflow",
    title: "AI로 반복 업무 줄이기: 실전 워크플로우",
    summary: "매일 30분씩 아끼는 AI 자동화 설정법을 소개합니다.",
    date: "2026.02.28",
    tags: ["자동화", "업무효율"],
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <h1 className="font-serif-kr text-[2.5rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[3rem]">
          블로그
        </h1>
        <p className="mt-4 max-w-[560px] text-base leading-[1.7] text-[var(--color-warm-gray)]">
          AI에 대한 쉬운 이야기들을 나눕니다.
        </p>

        <div className="mt-16 space-y-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-t border-[var(--color-warm-gray)]/20 py-10 transition-all duration-200 hover:pl-4"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start">
                <div className="md:col-span-2">
                  <span className="text-sm text-[var(--color-warm-gray)]">{post.date}</span>
                </div>
                <div className="md:col-span-7">
                  <h2 className="font-serif-kr text-xl leading-[1.3] text-[var(--color-headline)] transition-colors duration-200 group-hover:text-[var(--color-terracotta)] md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-base leading-[1.7] text-[var(--color-charcoal)]">
                    {post.summary}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <div className="flex gap-2 md:justify-end">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
          <div className="border-t border-[var(--color-warm-gray)]/20" />
        </div>
      </div>
    </main>
  );
}
