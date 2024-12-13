"use client";

import { ReactNode } from 'react';
import Navbar from './navbar';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const showNavbar = pathname !== '/login' && pathname !== '/registro';

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

// aqui se logra que el navbar no aparesca en paginas seleccionadas; login y registro