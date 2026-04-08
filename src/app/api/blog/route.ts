import { NextResponse } from "next/server";
import { getPosts } from "@/lib/blob-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = await getPosts();
  const published = posts.filter((p) => p.published);
  return NextResponse.json(published);
}
