import Link from "next/link";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, date, tags, summary")
    .eq("published", true)
    .order("date", { ascending: false });

  return (
    <main className="min-h-screen bg-[var(--color-cream)] pt-24">
      <div className="mx-auto max-w-[760px] px-6 pb-20">
        <h1 className="font-serif-kr text-[2rem] leading-[1.2] tracking-[-0.02em] text-[var(--color-headline)] md:text-[2.5rem]">
          블로그
        </h1>
        <p className="mt-4 text-base text-[var(--color-warm-gray)]">
          AI에 대한 쉬운 이야기들을 나눕니다.
        </p>

        <div className="mt-12 space-y-0">
          {!posts || posts.length === 0 ? (
            <p className="py-16 text-center text-sm text-[var(--color-warm-gray)]">
              아직 작성된 글이 없습니다.
            </p>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block border-b border-[var(--color-warm-gray)]/15 py-8 transition-colors hover:bg-[var(--color-warm-gray)]/5"
              >
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags?.map((tag: string) => (
                    <span key={tag} className="text-xs text-[var(--color-terracotta)]">{tag}</span>
                  ))}
                </div>
                <h2 className="font-serif-kr text-xl text-[var(--color-headline)] group-hover:text-[var(--color-terracotta)] transition-colors">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-2 text-sm text-[var(--color-warm-gray)] line-clamp-2">{post.summary}</p>
                )}
                <time className="mt-3 block text-xs text-[var(--color-warm-gray)]">{post.date}</time>
              </Link>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
