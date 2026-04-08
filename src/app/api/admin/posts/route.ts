import { NextRequest, NextResponse } from "next/server";
import { getPosts, savePosts, type BlogPost } from "@/lib/blob-store";

function checkAuth(req: NextRequest): boolean {
  const auth = req.headers.get("x-admin-password");
  return auth === process.env.ADMIN_PASSWORD;
}

export async function GET(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const posts = await getPosts();

  const newPost: BlogPost = {
    id: body.title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 60) + "-" + Date.now().toString(36),
    title: body.title,
    date: new Date().toISOString().split("T")[0],
    tags: body.tags || [],
    summary: body.summary || "",
    content: body.content || "",
    published: body.published ?? true,
  };

  posts.unshift(newPost);
  await savePosts(posts);
  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const posts = await getPosts();
  const index = posts.findIndex((p) => p.id === body.id);

  if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });

  posts[index] = { ...posts[index], ...body };
  await savePosts(posts);
  return NextResponse.json(posts[index]);
}

export async function DELETE(req: NextRequest) {
  if (!checkAuth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  let posts = await getPosts();
  posts = posts.filter((p) => p.id !== id);
  await savePosts(posts);
  return NextResponse.json({ success: true });
}
