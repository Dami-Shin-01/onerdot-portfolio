import type { Metadata } from "next";
import { Noto_Serif_KR, Cormorant_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
  weight: "100 900",
});

const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-serif-kr",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "온어닷 | 신다미 — AI를 사람의 언어로 가르치는 강사",
  description:
    "비전공자도 이해하는 눈높이 설명, 현장에서 바로 쓰는 AI 강의. 생성형 AI, AI 리터러시, AI 업무 자동화 전문 강사 신다미입니다.",
  keywords: ["AI 기초 강의", "직장인 AI 교육", "챗GPT 활용법", "AI 강사", "신다미", "온어닷"],
  openGraph: {
    title: "온어닷 | 신다미 — AI를 사람의 언어로 가르치는 강사",
    description: "비전공자도 이해하는 눈높이 설명, 현장에서 바로 쓰는 AI 강의",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${notoSerifKR.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded-[2px] focus:bg-[var(--color-terracotta)] focus:px-4 focus:py-2 focus:text-[var(--color-cream)]"
        >
          본문으로 건너뛰기
        </a>
        {children}
      </body>
    </html>
  );
}
