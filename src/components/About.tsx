"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
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
      id="about"
      className="relative pt-[60px] pb-[48px] lg:pt-[120px] lg:pb-[80px]"
    >
      {/* Section divider */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="mb-16 h-[1px] w-full bg-[var(--color-warm-gray)]/30" />
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section Number */}
          <div className="lg:col-span-1">
            <span className="section-number about-reveal">01</span>
          </div>

          {/* Main Content - 7 cols */}
          <div className="lg:col-span-7">
            <h2 className="about-reveal font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem] lg:text-[3rem]">
              AI를 사람의 언어로
              <br />
              가르치는 강사
            </h2>

            <div className="mt-10 max-w-[760px] space-y-6">
              <p className="about-reveal text-base leading-[1.8] text-[var(--color-charcoal)]">
                안녕하세요, 디자인온어닷 대표 신다미입니다. 웹디자이너 출신으로
                AI 기초 교육에 집중하고 있습니다. 기술 용어 대신 일상의 언어로,
                이론보다 실습 중심으로, 수강생의 눈높이에서 설명합니다.
              </p>
              <p className="about-reveal text-base leading-[1.8] text-[var(--color-charcoal)]">
                Google 공인 트레이너(Level 1, 2, TSA)이자
                AVPN AI Opportunity Fund Trainer로서,
                Google.org·AVPN, 공공기관, 기업 등 다양한 현장에서
                AI 교육을 진행해왔습니다.
              </p>
              <p className="about-reveal text-base leading-[1.8] text-[var(--color-charcoal)]">
                참여형 강의를 지향합니다. 강의실에서 직접 따라 하고, 질문하고,
                자신만의 결과물을 만들어보는 시간을 중요하게 생각합니다.
              </p>
            </div>
          </div>

          {/* Sidebar - 4 cols */}
          <div className="lg:col-span-4">
            <div className="space-y-8 lg:pl-8 lg:border-l lg:border-[var(--color-warm-gray)]/20">
              <div className="about-reveal">
                <p className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)] uppercase">
                  자격사항
                </p>
                <p className="mt-2 text-base text-[var(--color-charcoal)]">
                  Google 공인 트레이너
                  <br />
                  <span className="text-sm text-[var(--color-warm-gray)]">Level 1, Level 2, TSA</span>
                </p>
                <p className="mt-2 text-base text-[var(--color-charcoal)]">
                  AVPN AI Opportunity Fund Trainer
                  <br />
                  <span className="text-sm text-[var(--color-warm-gray)]">Google.org · ADB</span>
                </p>
              </div>

              <div className="about-reveal">
                <p className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)] uppercase">
                  경력
                </p>
                <p className="mt-2 text-base text-[var(--color-charcoal)]">
                  디자인온어닷 대표
                  <br />
                  <span className="text-sm text-[var(--color-warm-gray)]">웹디자인 · 2025 ~</span>
                </p>
                <p className="mt-2 text-base text-[var(--color-charcoal)]">
                  (주) 메디톡스 QA팀
                  <br />
                  <span className="text-sm text-[var(--color-warm-gray)]">데이터/문서/교육 · 2018 ~ 2023</span>
                </p>
              </div>

              <div className="about-reveal">
                <p className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)] uppercase">
                  강의 철학
                </p>
                <p className="mt-2 text-base text-[var(--color-charcoal)]">
                  &ldquo;눈높이에서 시작하는
                  <br />
                  참여형 AI 교육&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
