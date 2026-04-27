import AuthGuard from '@/components/auth-guard';
import { ReactNode } from 'react';
import AdminHeader from './admin-header';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <AdminHeader />
      <div className="pt-32">
        <AuthGuard>
          {children}
        </AuthGuard>
      </div>
    </>
  );
}
