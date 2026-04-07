"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TabType = "b2c" | "b2b";
type FormStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<TabType>("b2c");
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus("success");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

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

            {/* Tab Switcher */}
            <div className="contact-reveal mt-12 flex gap-0 border-b border-[var(--color-warm-gray)]/20">
              <button
                onClick={() => setActiveTab("b2c")}
                className={`px-6 py-3 text-sm transition-colors duration-200 ${
                  activeTab === "b2c"
                    ? "border-b-2 border-[var(--color-soft-gold)] text-[var(--color-soft-gold)]"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-cream)]"
                }`}
              >
                개인 수강 문의
              </button>
              <button
                onClick={() => setActiveTab("b2b")}
                className={`px-6 py-3 text-sm transition-colors duration-200 ${
                  activeTab === "b2b"
                    ? "border-b-2 border-[var(--color-soft-gold)] text-[var(--color-soft-gold)]"
                    : "text-[var(--color-warm-gray)] hover:text-[var(--color-cream)]"
                }`}
              >
                기업/기관 출강 문의
              </button>
            </div>

            {/* Form */}
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              onSubmit={handleSubmit}
              className="contact-reveal mt-10 max-w-[640px] space-y-6"
            >
              {/* Hidden field for tab type */}
              <input type="hidden" name="inquiry_type" value={activeTab} />

              {/* B2C Fields */}
              {activeTab === "b2c" && (
                <>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                      이름
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                      placeholder="성함을 입력해주세요"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                      연락처
                    </label>
                    <input
                      type="text"
                      name="contact"
                      required
                      className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                      placeholder="이메일 또는 전화번호"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                      관심 과정
                    </label>
                    <select
                      name="interest"
                      className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 focus:border-[var(--color-soft-gold)]"
                    >
                      <option value="" className="bg-[var(--color-dark-bg)]">
                        선택해주세요
                      </option>
                      <option value="generative-ai" className="bg-[var(--color-dark-bg)]">
                        생성형 AI 활용
                      </option>
                      <option value="ai-literacy" className="bg-[var(--color-dark-bg)]">
                        AI 리터러시
                      </option>
                      <option value="ai-automation" className="bg-[var(--color-dark-bg)]">
                        AI 업무 자동화
                      </option>
                      <option value="content-automation" className="bg-[var(--color-dark-bg)]">
                        소상공인 콘텐츠 자동화
                      </option>
                      <option value="other" className="bg-[var(--color-dark-bg)]">
                        기타
                      </option>
                    </select>
                  </div>
                </>
              )}

              {/* B2B Fields */}
              {activeTab === "b2b" && (
                <>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                        담당자명
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                        placeholder="담당자 성함"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                        회사명
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                        placeholder="기업/기관명"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                      연락처
                    </label>
                    <input
                      type="text"
                      name="contact"
                      required
                      className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                      placeholder="이메일 또는 전화번호"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                        예상 인원
                      </label>
                      <input
                        type="text"
                        name="participants"
                        className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                        placeholder="예: 20명"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                        희망 주제
                      </label>
                      <select
                        name="topic"
                        className="w-full border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 focus:border-[var(--color-soft-gold)]"
                      >
                        <option value="" className="bg-[var(--color-dark-bg)]">
                          선택해주세요
                        </option>
                        <option value="generative-ai" className="bg-[var(--color-dark-bg)]">
                          생성형 AI 활용
                        </option>
                        <option value="ai-literacy" className="bg-[var(--color-dark-bg)]">
                          AI 리터러시
                        </option>
                        <option value="ai-automation" className="bg-[var(--color-dark-bg)]">
                          AI 업무 자동화
                        </option>
                        <option value="content-automation" className="bg-[var(--color-dark-bg)]">
                          콘텐츠 자동화
                        </option>
                        <option value="other" className="bg-[var(--color-dark-bg)]">
                          기타
                        </option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="mb-2 block text-xs tracking-[0.06em] uppercase text-[var(--color-warm-gray)]">
                  메시지
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="w-full resize-none border-b border-[var(--color-warm-gray)]/30 bg-transparent py-3 text-base text-[var(--color-cream)] outline-none transition-colors duration-200 placeholder:text-[var(--color-warm-gray)]/40 focus:border-[var(--color-soft-gold)]"
                  placeholder="문의 내용을 자유롭게 적어주세요"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="mt-4 rounded-[2px] bg-[var(--color-soft-gold)] px-10 py-3.5 text-base text-[var(--color-dark-bg)] transition-opacity duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === "submitting" ? "보내는 중..." : "보내기"}
              </button>

              {formStatus === "success" && (
                <p className="mt-4 text-sm text-[var(--color-soft-gold)]">
                  문의가 접수되었습니다. 빠르게 답변드리겠습니다.
                </p>
              )}
              {formStatus === "error" && (
                <p className="mt-4 text-sm text-[var(--color-terracotta)]">
                  전송에 실패했습니다.{" "}
                  <a href="mailto:hello@onerdot.com" className="underline">
                    이메일로 직접 문의해주세요.
                  </a>
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
