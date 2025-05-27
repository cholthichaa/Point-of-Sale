import React, { ReactNode } from 'react'; 
import SidebarAdmin from './SidebarAdmin.tsx';
import Navbar from './Navbar.tsx';

type LayoutAdminProps = {
  children: ReactNode;
};

export default function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}