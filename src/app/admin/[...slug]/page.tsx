// src/app/admin/[...slug]/page.tsx
import { notFound } from 'next/navigation';

export default function CatchAllAdminPage() {
  notFound(); // Force Next.js to show admin's not-found.tsx if it exists
}
