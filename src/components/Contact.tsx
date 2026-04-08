"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el) => {
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
      id="contact"
      className="relative bg-[var(--color-dark-bg)] pt-[60px] pb-[48px] lg:pt-[120px] lg:pb-[80px]"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Section Number */}
          <div className="lg:col-span-1">
            <span className="section-number contact-reveal !text-[var(--color-soft-gold)]/60">
              05
            </span>
          </div>

          {/* Content */}
          <div className="lg:col-span-11">
            <h2 className="contact-reveal font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-cream)] md:text-[2.5rem] lg:text-[3rem]">
              문의하기
            </h2>
            <p className="contact-reveal mt-4 max-w-[560px] text-base leading-[1.7] text-[var(--color-warm-gray)]">
              강의 신청, 기업 출강, 협업 제안 등 무엇이든 편하게 문의해주세요.
            </p>

            {/* CTA Buttons */}
            <div className="contact-reveal mt-12 flex flex-col gap-4 sm:flex-row sm:gap-6">
              <a
                href="https://forms.gle/5o4LS5wimCbD7Vgu5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[var(--color-soft-gold)] px-10 py-4 text-base font-medium text-[var(--color-dark-bg)] transition-opacity duration-200 hover:opacity-90"
              >
                강의 문의하기
                <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                href="mailto:de.onadot@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-[2px] border border-[var(--color-soft-gold)]/40 px-10 py-4 text-base text-[var(--color-soft-gold)] transition-colors duration-200 hover:border-[var(--color-soft-gold)] hover:bg-[var(--color-soft-gold)]/10"
              >
                이메일 보내기
              </a>
            </div>

            {/* Contact Info */}
            <div className="contact-reveal mt-16 grid grid-cols-1 gap-8 border-t border-[var(--color-warm-gray)]/15 pt-10 sm:grid-cols-3">
              <div>
                <p className="text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                  Email
                </p>
                <a
                  href="mailto:de.onadot@gmail.com"
                  className="mt-2 block text-base text-[var(--color-cream)] transition-opacity duration-200 hover:opacity-70"
                >
                  de.onadot@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                  Phone
                </p>
                <a
                  href="tel:010-3803-3719"
                  className="mt-2 block text-base text-[var(--color-cream)] transition-opacity duration-200 hover:opacity-70"
                >
                  010-3803-3719
                </a>
              </div>
              <div>
                <p className="text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                  Response
                </p>
                <p className="mt-2 text-base text-[var(--color-cream)]">
                  1~2 영업일 내 회신
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
