import AddTeacherPage from '@/components/admin-components/ClientAddTeacher';
import Loader from '@/components/global/Loader';
import { Suspense } from 'react';


export default function AddCoursePage() {
  return (
    <Suspense fallback={<Loader/>}>
      <AddTeacherPage/>
    </Suspense>
  );
}
