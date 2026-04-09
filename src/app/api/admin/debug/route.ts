import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // List ALL blobs to see what's actually stored
    const allBlobs = await list();
    const withPrefix = await list({ prefix: "admin/posts.json" });
    const withPrefix2 = await list({ prefix: "admin/" });

    return NextResponse.json({
      all: allBlobs.blobs.map((b) => ({ pathname: b.pathname, url: b.url, downloadUrl: b.downloadUrl, size: b.size })),
      withPostsPrefix: withPrefix.blobs.map((b) => ({ pathname: b.pathname, url: b.url })),
      withAdminPrefix: withPrefix2.blobs.map((b) => ({ pathname: b.pathname, url: b.url })),
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
