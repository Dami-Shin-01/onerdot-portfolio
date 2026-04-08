"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    year: "2026",
    items: [
      { org: "Google.org · AVPN", topic: "Gemini를 활용 및 심화 — 딥리서치, 에이전틱 시스템 트렌드" },
      { org: "미라클 평생교육원", topic: "AI 활용의 정석, 반복 업무에서 탈출하는 일잘러 도구" },
    ],
  },
  {
    year: "2025",
    items: [
      { org: "한국장애인고용공단", topic: "교사 대상 AI 활용 중급 과정 — 맞춤형 교육자료 제작 및 AI Assistant 구현" },
      { org: "횡성군청", topic: "공무원 대상 생성형 AI & ChatGPT 교육" },
      { org: "동해교육지원청 · AIxSeed", topic: "AI 활용 윤리 및 프롬프트 지시 기법" },
      { org: "Google.org · AVPN", topic: "Gemini를 활용한 챗봇 제작 및 심화 활용법" },
      { org: "GPTers", topic: "GPT를 활용한 챗봇 제작 및 활용" },
    ],
  },
];

export default function TrackRecord() {
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Reveal animation
      gsap.utils.toArray<HTMLElement>(".track-reveal").forEach((el) => {
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.6,
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
      id="track-record"
      className="relative pt-[60px] pb-[48px] lg:pt-[120px] lg:pb-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 h-[1px] w-full bg-[var(--color-warm-gray)]/30" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section Number */}
          <div className="lg:col-span-1">
            <span className="section-number track-reveal">03</span>
          </div>

          {/* Content */}
          <div className="lg:col-span-11">
            <h2 className="track-reveal font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem] lg:text-[3rem]">
              강의 이력
            </h2>

            {/* Timeline */}
            <div className="mt-12 space-y-12">
              {timeline.map((entry) => (
                <div key={entry.year} className="track-reveal">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                    <div className="md:col-span-2">
                      <span className="font-serif-en text-lg text-[var(--color-warm-gray)]">
                        {entry.year}
                      </span>
                    </div>
                    <div className="md:col-span-10">
                      <ul className="space-y-3">
                        {entry.items.map((item) => (
                          <li
                            key={`${item.org}-${item.topic}`}
                            className="text-base leading-[1.8] text-[var(--color-charcoal)]"
                          >
                            <span className="text-[var(--color-warm-gray)]">{item.org}</span>
                            {" "}
                            {item.topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="track-reveal mt-16">
              <a
                href="#contact"
                className="text-base text-[var(--color-terracotta)] transition-colors duration-200 hover:text-[var(--color-terracotta-hover)]"
              >
                출강 문의하기 &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
