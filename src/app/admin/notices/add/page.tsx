import { Suspense } from 'react';
import AddNoticePage from '@/components/admin-components/ClientAddNotice';

export default function AddCoursePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddNoticePage/>
    </Suspense>
  );
}
