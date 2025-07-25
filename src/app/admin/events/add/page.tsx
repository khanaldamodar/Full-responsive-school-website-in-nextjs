import AddEventPage from '@/components/admin-components/ClientAddEvent';
import { Suspense } from 'react';


export default function AddCoursePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddEventPage/>
    </Suspense>
  );
}
