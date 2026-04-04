'use client';

import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { usePathname } from 'next/navigation';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const authRoutes = ['/', '/login', '/register', '/auth'];
  const isAuthRoute =
    authRoutes.includes(pathname) ||
    pathname.startsWith('/login') ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/auth');

  return (
    <html lang="en">
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background text-text-primary" style={{ fontFamily: "'Inter', sans-serif", margin: 0, padding: 0 }}>
        <AuthProvider>
          {isAuthRoute ? (
            children
          ) : (
            <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#080808' }}>
              <Sidebar />
              <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                {children}
              </main>
            </div>
          )}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#161616',
                color: '#fff',
                border: '1px solid #1f1f1f',
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
