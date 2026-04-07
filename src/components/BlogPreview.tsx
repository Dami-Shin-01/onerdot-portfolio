"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
    summary: "같은 질문도 어떻게 하느냐에 따라 답이 달라집니다.",
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

export default function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".blog-reveal").forEach((el, i) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
          delay: i * 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative pt-[60px] pb-[48px] lg:pt-[120px] lg:pb-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 h-[1px] w-full bg-[var(--color-warm-gray)]/30" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section Number */}
          <div className="lg:col-span-1">
            <span className="section-number blog-reveal">04</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-11">
            <h2 className="blog-reveal font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem] lg:text-[3rem]">
              블로그
            </h2>
            <p className="blog-reveal mt-4 max-w-[560px] text-base leading-[1.7] text-[var(--color-warm-gray)]">
              AI에 대한 쉬운 이야기들을 나눕니다.
            </p>

            {/* Blog Cards - Asymmetric Layout */}
            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Featured Post (Large) */}
              <div className="blog-reveal group md:row-span-2">
                <a href={`/blog/${posts[0].slug}`} className="block">
                  {/* Placeholder Thumbnail */}
                  <div className="aspect-[4/3] w-full bg-[var(--color-warm-gray)]/10 transition-all duration-400 group-hover:shadow-lg" />
                  <div className="mt-4">
                    <div className="flex gap-2">
                      {posts[0].tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-2 font-serif-kr text-xl leading-[1.3] text-[var(--color-headline)] transition-colors duration-200 group-hover:text-[var(--color-terracotta)] md:text-2xl">
                      {posts[0].title}
                    </h3>
                    <p className="mt-2 text-base leading-[1.7] text-[var(--color-charcoal)]">
                      {posts[0].summary}
                    </p>
                    <p className="mt-3 text-sm text-[var(--color-warm-gray)]">
                      {posts[0].date}
                    </p>
                  </div>
                </a>
              </div>

              {/* Small Posts */}
              {posts.slice(1).map((post) => (
                <div key={post.slug} className="blog-reveal group">
                  <a href={`/blog/${post.slug}`} className="block">
                    <div className="aspect-[16/9] w-full bg-[var(--color-warm-gray)]/10 transition-all duration-400 group-hover:shadow-lg" />
                    <div className="mt-4">
                      <div className="flex gap-2">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="mt-2 font-serif-kr text-lg leading-[1.3] text-[var(--color-headline)] transition-colors duration-200 group-hover:text-[var(--color-terracotta)]">
                        {post.title}
                      </h3>
                      <p className="mt-3 text-sm text-[var(--color-warm-gray)]">
                        {post.date}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="blog-reveal mt-12">
              <a
                href="/blog"
                className="text-base text-[var(--color-terracotta)] transition-colors duration-200 hover:text-[var(--color-terracotta-hover)]"
              >
                더 많은 글 읽기 &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
