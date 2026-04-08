import type { Metadata } from "next";
import MaterialsContent from "./MaterialsContent";

export const metadata: Metadata = {
  title: "강의자료실 | 온어닷",
  description: "수강생 전용 강의자료실",
  robots: { index: false, follow: false },
};

export default function MaterialsPage() {
  return <MaterialsContent />;
}
