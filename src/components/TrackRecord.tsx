"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "2026", items: [{ org: "OO기업", topic: "AI 업무자동화 워크숍" }, { org: "XX공공기관", topic: "AI 리터러시 교육" }] },
  { year: "2025", items: [{ org: "OO대학교", topic: "생성형 AI 활용 특강" }, { org: "XX기업", topic: "소상공인 콘텐츠 자동화" }, { org: "OO센터", topic: "직장인 AI 교육" }] },
  { year: "2024", items: [{ org: "XX기관", topic: "AI 기초 교육" }, { org: "OO기업", topic: "ChatGPT 업무 활용" }, { org: "XX대학교", topic: "AI 리터러시 강의" }] },
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
