"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(nameRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
      })
        .from(
          sloganRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.5"
        )
        .from(
          ctaRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.5,
          },
          "-=0.4"
        )
        .from(
          imageRef.current,
          {
            x: 60,
            opacity: 0,
            duration: 0.7,
          },
          0.35
        )
        .from(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            duration: 0.4,
          },
          0.9
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:px-12">
        {/* Text Content - Left */}
        <div className="lg:col-span-7">
          <p className="mb-4 text-sm tracking-[0.06em] text-[var(--color-warm-gray)]">
            AI INSTRUCTOR
          </p>
          <h1
            ref={nameRef}
            className="font-serif-kr text-[2.5rem] leading-[1.1] tracking-[-0.02em] text-[var(--color-headline)] md:text-[3.5rem] lg:text-[4.5rem]"
          >
            AI, 어렵지 않습니다.
            <br />
            <span className="text-[var(--color-warm-gray)]">처음 배우는 분들과</span>
            <br />
            함께 해왔습니다.
          </h1>
          <p
            ref={sloganRef}
            className="mt-6 max-w-[560px] text-lg leading-[1.7] text-[var(--color-charcoal)] md:text-xl"
          >
            비전공자도 이해하는 눈높이 설명,
            <br className="hidden md:block" />
            현장에서 바로 쓰는 AI 강의
          </p>
          <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="rounded-[2px] bg-[var(--color-terracotta)] px-8 py-3.5 text-base text-[var(--color-cream)] transition-colors duration-200 hover:bg-[var(--color-terracotta-hover)]"
            >
              강의 신청하기
            </a>
            <a
              href="#contact"
              className="rounded-[2px] border border-[var(--color-charcoal)] px-8 py-3.5 text-base text-[var(--color-charcoal)] transition-colors duration-200 hover:bg-[var(--color-charcoal)] hover:text-[var(--color-cream)]"
            >
              기업 출강 문의
            </a>
          </div>
        </div>

        {/* Profile Image - Right (off-grid) */}
        <div ref={imageRef} className="relative lg:col-span-5 lg:-mr-10 xl:-mr-20">
          <div className="relative aspect-[3/4] w-full max-w-[480px] overflow-hidden bg-[var(--color-warm-gray)]/20 mix-blend-multiply lg:ml-auto">
            {/* Placeholder for profile image */}
            <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-warm-gray)]/10">
              <div className="text-center">
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-[var(--color-warm-gray)]/20" />
                <p className="text-sm text-[var(--color-warm-gray)]">프로필 사진</p>
              </div>
            </div>
            {/* Decorative watermark */}
            <span
              className="pointer-events-none absolute -bottom-5 -left-6 select-none font-serif-en text-[6rem] italic leading-none text-[rgba(193,122,90,0.12)]"
              aria-hidden="true"
            >
              Shin Dami
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)]">SCROLL</span>
          <div className="h-8 w-[1px] bg-[var(--color-warm-gray)]" />
        </div>
      </div>
    </section>
  );
}
