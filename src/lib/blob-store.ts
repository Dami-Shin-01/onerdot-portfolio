import { put, list, del, head } from "@vercel/blob";

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  published: boolean;
}

export interface MaterialItem {
  title: string;
  type: string;
  url: string;
  date: string;
}

export interface MaterialCourse {
  id: string;
  title: string;
  description: string;
  materials: MaterialItem[];
}

export interface MaterialsData {
  password: string;
  courses: MaterialCourse[];
}

const POSTS_KEY = "admin/posts.json";
const MATERIALS_KEY = "admin/materials.json";

async function findBlobUrl(prefix: string): Promise<string | null> {
  const { blobs } = await list({ prefix });
  if (blobs.length === 0) return null;
  // For private blobs, get a downloadUrl
  const blob = await head(blobs[0].url);
  return blob.downloadUrl;
}

async function findBlobRawUrl(prefix: string): Promise<string | null> {
  const { blobs } = await list({ prefix });
  return blobs.length > 0 ? blobs[0].url : null;
}

async function readJson<T>(prefix: string, fallback: T): Promise<T> {
  const downloadUrl = await findBlobUrl(prefix);
  if (!downloadUrl) return fallback;
  const res = await fetch(downloadUrl, { cache: "no-store" });
  if (!res.ok) return fallback;
  return res.json();
}

async function writeJson<T>(prefix: string, data: T): Promise<void> {
  // Delete existing blob first
  const existing = await findBlobRawUrl(prefix);
  if (existing) {
    try { await del(existing); } catch { /* ignore */ }
  }
  await put(prefix, JSON.stringify(data, null, 2), {
    access: "private",
    addRandomSuffix: false,
    contentType: "application/json",
  });
}

// Blog Posts
export async function getPosts(): Promise<BlogPost[]> {
  return readJson<BlogPost[]>(POSTS_KEY, []);
}

export async function savePosts(posts: BlogPost[]): Promise<void> {
  await writeJson(POSTS_KEY, posts);
}

// Materials
export async function getMaterials(): Promise<MaterialsData> {
  return readJson<MaterialsData>(MATERIALS_KEY, {
    password: "onadot2026",
    courses: [],
  });
}

export async function saveMaterials(data: MaterialsData): Promise<void> {
  await writeJson(MATERIALS_KEY, data);
}
