import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("title, summary, content")
    .eq("id", slug)
    .eq("published", true)
    .single();

  if (!post) return { title: "글을 찾을 수 없습니다 | 온어닷" };
  return {
    title: `${post.title} | 온어닷`,
    description: post.summary || post.content?.slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("id", slug)
    .eq("published", true)
    .single();

  if (!post) notFound();

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-24">
      <article className="mx-auto max-w-[760px] px-6 pb-20">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm text-[var(--color-warm-gray)] transition-colors hover:text-[var(--color-terracotta)]"
        >
          &larr; 블로그 목록
        </Link>

        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags?.map((tag: string) => (
            <span key={tag} className="text-xs text-[var(--color-terracotta)]">{tag}</span>
          ))}
        </div>

        <h1 className="font-serif-kr text-[2rem] leading-[1.3] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem]">
          {post.title}
        </h1>

        <time className="mt-4 block text-sm text-[var(--color-warm-gray)]">{post.date}</time>

        <div className="mt-10 space-y-6 text-base leading-[1.9] text-[var(--color-charcoal)]">
          {post.content?.split("\n\n").map((paragraph: string, i: number) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
