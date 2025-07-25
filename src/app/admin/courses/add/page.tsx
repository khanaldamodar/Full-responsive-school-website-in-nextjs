import ClientAddCourse from '@/components/admin-components/ClientAddCourse';
import { Suspense } from 'react';


export default function AddCoursePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientAddCourse />
    </Suspense>
  );
}
