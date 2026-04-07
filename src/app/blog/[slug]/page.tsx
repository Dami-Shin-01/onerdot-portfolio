import type { Metadata } from "next";
import Link from "next/link";

// Placeholder - will be replaced with Contentlayer
const posts: Record<
  string,
  { title: string; date: string; tags: string[]; content: string }
> = {
  "ai-basics-for-beginners": {
    title: "비전공자를 위한 AI 기초 가이드",
    date: "2026.03.15",
    tags: ["AI 기초", "비전공자"],
    content: `AI란 무엇일까요? 간단히 말해, 컴퓨터가 사람처럼 학습하고 판단할 수 있게 만드는 기술입니다.

요즘 뉴스에서 자주 듣는 ChatGPT, 미드저니 같은 서비스들이 모두 AI 기술을 활용한 것입니다. 하지만 이런 도구들을 사용하기 위해 프로그래밍을 알 필요는 없습니다.

이 글에서는 AI의 기본 개념을 기술 용어 없이 설명하겠습니다. AI가 어떻게 작동하는지 이해하면, 이 기술을 더 효과적으로 활용할 수 있습니다.`,
  },
  "chatgpt-prompt-tips": {
    title: "ChatGPT 프롬프트 작성법 5가지",
    date: "2026.03.08",
    tags: ["ChatGPT", "프롬프트"],
    content: `ChatGPT에게 좋은 답변을 얻으려면, 좋은 질문을 해야 합니다. 같은 내용을 물어도 어떻게 질문하느냐에 따라 결과가 크게 달라집니다.

효과적인 프롬프트 작성의 5가지 핵심 원칙을 소개합니다. 이 원칙들을 익히면 AI를 훨씬 더 효과적으로 활용할 수 있습니다.`,
  },
  "ai-automation-workflow": {
    title: "AI로 반복 업무 줄이기: 실전 워크플로우",
    date: "2026.02.28",
    tags: ["자동화", "업무효율"],
    content: `매일 반복하는 업무가 있나요? 이메일 정리, 보고서 작성, 데이터 입력... 이런 작업들을 AI로 자동화할 수 있습니다.

이 글에서는 실제로 업무 현장에서 바로 적용할 수 있는 AI 자동화 워크플로우를 소개합니다.`,
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return { title: "글을 찾을 수 없습니다 | On a DoT" };
  return {
    title: `${post.title} | On a DoT`,
    description: post.content.slice(0, 160),
  };
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif-kr text-2xl text-[var(--color-headline)]">
            글을 찾을 수 없습니다
          </h1>
          <Link
            href="/blog"
            className="mt-4 inline-block text-[var(--color-terracotta)]"
          >
            블로그 목록으로 돌아가기
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-20">
      <article className="mx-auto max-w-[760px] px-6">
        {/* Meta */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-[var(--color-warm-gray)] transition-colors duration-200 hover:text-[var(--color-charcoal)]"
          >
            &larr; 블로그 목록
          </Link>
        </div>

        <div className="flex gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs tracking-[0.06em] text-[var(--color-warm-gray)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mt-4 font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem] lg:text-[3rem]">
          {post.title}
        </h1>

        <p className="mt-4 text-sm text-[var(--color-warm-gray)]">{post.date}</p>

        <div className="mt-8 h-[1px] w-full bg-[var(--color-warm-gray)]/30" />

        {/* Content */}
        <div className="mt-12 space-y-6 text-base leading-[1.8] text-[var(--color-charcoal)]">
          {post.content.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 border-t border-[var(--color-warm-gray)]/20 pt-10">
          <p className="text-base text-[var(--color-charcoal)]">
            AI 강의에 관심이 있으신가요?
          </p>
          <a
            href="/#contact"
            className="mt-4 inline-block rounded-[2px] bg-[var(--color-terracotta)] px-8 py-3.5 text-base text-[var(--color-cream)] transition-colors duration-200 hover:bg-[var(--color-terracotta-hover)]"
          >
            강의 문의하기
          </a>
        </div>
      </article>
    </main>
  );
}
