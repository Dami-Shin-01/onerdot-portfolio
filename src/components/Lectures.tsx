"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lectures = [
  {
    id: 1,
    title: "생성형 AI & ChatGPT 활용",
    target: "직장인, 공무원, 일반인",
    description:
      "ChatGPT의 기본 사용법부터 GPTs 제작, 업무 자동화까지. 프롬프트 작성 기법과 실무 적용 사례를 함께 다룹니다.",
    outcome: "AI 도구를 활용한 업무 생산성 향상",
  },
  {
    id: 2,
    title: "Google Gemini 활용 및 심화",
    target: "기업 실무자, 교육자",
    description:
      "Gemini의 Gems 제작, 딥리서치를 이용한 시장조사, 에이전틱 시스템 트렌드까지. Google 공인 트레이너가 직접 전하는 Gemini 심화 과정.",
    outcome: "Gemini 기반 업무 효율화 및 리서치 역량",
  },
  {
    id: 3,
    title: "AI 리터러시 & 윤리",
    target: "비전공자, 교사, 공공기관 종사자",
    description:
      "AI의 정의와 작동 원리, 윤리적·비판적 사용법, 프롬프팅 기법을 적용한 질문법. 기술 용어 없이 쉬운 언어로 설명합니다.",
    outcome: "AI에 대한 올바른 이해와 윤리적 활용 능력",
  },
  {
    id: 4,
    title: "교사 대상 AI 활용 과정",
    target: "초·중·고 교사, 교육 담당자",
    description:
      "AI 기반 맞춤형 교육자료 제작 및 AI Assistant 구현. 교육 현장에 즉시 적용 가능한 AI 활용 역량을 강화합니다.",
    outcome: "교육 현장 AI 도입 및 수업 혁신",
  },
];

export default function Lectures() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".lecture-reveal").forEach((el, i) => {
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
      id="lectures"
      className="relative pt-[60px] pb-[48px] lg:pt-[120px] lg:pb-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 h-[1px] w-full bg-[var(--color-warm-gray)]/30" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section Number */}
          <div className="lg:col-span-1">
            <span className="section-number lecture-reveal">02</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-11">
            <h2 className="lecture-reveal font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem] lg:text-[3rem]">
              맞춤형 강의 주제
            </h2>
            <p className="lecture-reveal mt-4 max-w-[560px] text-base leading-[1.7] text-[var(--color-warm-gray)]">
              고정된 커리큘럼이 아닌, 대상과 목적에 맞춘 맞춤형 강의를 제공합니다.
            </p>

            {/* Lecture List */}
            <div className="mt-16">
              {lectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className="lecture-reveal group border-t border-[var(--color-warm-gray)]/20 border-l-2 border-l-transparent py-10 pl-6 transition-all duration-200 hover:border-l-[var(--color-terracotta)]"
                >
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-start md:gap-8">
                    <div className="md:col-span-5">
                      <h3 className="font-serif-kr text-xl leading-[1.3] text-[var(--color-headline)] md:text-2xl lg:text-[1.75rem]">
                        {lecture.title}
                      </h3>
                      <p className="mt-2 text-sm text-[var(--color-warm-gray)]">
                        {lecture.target}
                      </p>
                    </div>
                    <div className="md:col-span-5">
                      <p className="text-base leading-[1.8] text-[var(--color-charcoal)]">
                        {lecture.description}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                        기대 효과
                      </p>
                      <p className="mt-1 text-sm text-[var(--color-charcoal)]">
                        {lecture.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {/* Last border */}
              <div className="border-t border-[var(--color-warm-gray)]/20" />
            </div>

            {/* B2B Process */}
            <div className="lecture-reveal mt-16">
              <p className="mb-6 text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                기업 출강 프로세스
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-charcoal)]">
                <span className="rounded-[2px] border border-[var(--color-warm-gray)]/30 px-4 py-2">
                  문의
                </span>
                <span className="text-[var(--color-warm-gray)]">&rarr;</span>
                <span className="rounded-[2px] border border-[var(--color-warm-gray)]/30 px-4 py-2">
                  상담
                </span>
                <span className="text-[var(--color-warm-gray)]">&rarr;</span>
                <span className="rounded-[2px] border border-[var(--color-warm-gray)]/30 px-4 py-2">
                  맞춤 커리큘럼
                </span>
                <span className="text-[var(--color-warm-gray)]">&rarr;</span>
                <span className="rounded-[2px] border border-[var(--color-terracotta)]/40 bg-[var(--color-terracotta)]/5 px-4 py-2 text-[var(--color-terracotta)]">
                  강의
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="lecture-reveal mt-12">
              <a
                href="#contact"
                className="rounded-[2px] bg-[var(--color-terracotta)] px-8 py-3.5 text-base text-[var(--color-cream)] transition-colors duration-200 hover:bg-[var(--color-terracotta-hover)]"
              >
                맞춤 강의 문의하기
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
