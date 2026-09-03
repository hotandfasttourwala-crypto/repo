"use client";
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({ 
  children,
  header,
  footer,
  mobileBar
}: { 
  children: React.ReactNode,
  header: React.ReactNode,
  footer: React.ReactNode,
  mobileBar: React.ReactNode
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      {header}
      <main className="flex-grow">{children}</main>
      {footer}
      {mobileBar}
    </>
  );
}
