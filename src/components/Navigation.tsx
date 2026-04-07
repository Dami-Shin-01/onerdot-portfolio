"use client";

import { useEffect, useState } from "react";

const navItems = [
  { label: "소개", href: "#about" },
  { label: "강의", href: "#lectures" },
  { label: "이력", href: "#track-record" },
  { label: "블로그", href: "#blog" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-cream)]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(128,120,114,0.2)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4 lg:px-12">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="font-serif-en text-xl tracking-[-0.02em] text-[var(--color-headline)]"
        >
          onerdot
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`relative text-sm transition-colors duration-200 after:absolute after:bottom-[-2px] after:left-0 after:h-[1px] after:bg-[var(--color-terracotta)] after:transition-all after:duration-300 ${
                activeSection === item.href
                  ? "text-[var(--color-headline)] after:w-full"
                  : "text-[var(--color-charcoal)] after:w-0 hover:text-[var(--color-headline)] hover:after:w-full"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="rounded-[2px] bg-[var(--color-terracotta)] px-5 py-2.5 text-sm text-[var(--color-cream)] transition-colors duration-200 hover:bg-[var(--color-terracotta-hover)]"
          >
            문의하기
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="flex min-h-[48px] min-w-[48px] flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-transform duration-300 ${
              mobileOpen ? "translate-y-[5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-opacity duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[2px] w-6 bg-[var(--color-charcoal)] transition-transform duration-300 ${
              mobileOpen ? "-translate-y-[5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 bg-[var(--color-cream)]/95 px-6 pb-6 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-base ${
                activeSection === item.href
                  ? "text-[var(--color-headline)]"
                  : "text-[var(--color-charcoal)]"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-2 inline-block rounded-[2px] bg-[var(--color-terracotta)] px-5 py-2.5 text-center text-sm text-[var(--color-cream)]"
          >
            문의하기
          </a>
        </div>
      </div>
    </header>
  );
}
