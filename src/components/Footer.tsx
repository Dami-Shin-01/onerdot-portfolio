export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-warm-gray)]/20 bg-[var(--color-cream)] py-12">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Logo & Copyright */}
          <div>
            <span className="font-serif-en text-lg tracking-[-0.02em] text-[var(--color-headline)]">
              On a DoT
            </span>
            <p className="mt-2 text-sm text-[var(--color-warm-gray)]">
              &copy; {new Date().getFullYear()} 온어닷. All rights reserved.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:de.onadot@gmail.com"
              className="text-sm text-[var(--color-warm-gray)] transition-colors duration-200 hover:text-[var(--color-charcoal)]"
            >
              Email
            </a>
            <a
              href="/materials"
              className="text-sm text-[var(--color-warm-gray)] transition-colors duration-200 hover:text-[var(--color-charcoal)]"
            >
              강의자료실
            </a>
            <a
              href="/admin"
              className="text-sm text-[var(--color-warm-gray)]/50 transition-colors duration-200 hover:text-[var(--color-charcoal)]"
            >
              관리자
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
