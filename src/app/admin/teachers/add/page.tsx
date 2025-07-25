import AddTeacherPage from '@/components/admin-components/ClientAddTeacher';
import { Suspense } from 'react';


export default function AddCoursePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTeacherPage/>
    </Suspense>
  );
}
