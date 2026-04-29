import Sidebar from '@/components/admin/Sidebar';
import AdminGate from '@/components/admin/AdminGate';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGate>
      <div className="flex min-h-screen bg-zbg">
        <Sidebar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AdminGate>
  );
}
