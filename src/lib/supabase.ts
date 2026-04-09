import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Types
export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  content: string;
  published: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
}

export interface Material {
  id?: number;
  course_id: string;
  title: string;
  type: string;
  url: string;
  date: string;
  sort_order: number;
}

export interface CourseWithMaterials extends Course {
  materials: Material[];
}
