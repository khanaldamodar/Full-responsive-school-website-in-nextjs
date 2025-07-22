// src/app/(user)/academics/[slug]/page.tsx
import CourseClientPage from "@/components/Course-page-components/CourseClientPage";

export default function Page({ params }: { params: { slug: string } }) {
  return <CourseClientPage slug={params.slug} />;
}
