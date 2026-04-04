'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { documents } from '@/lib/api';
import { IconFileDescription, IconUser, IconFiles, IconUpload } from '@tabler/icons-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({ totalDocs: 0, pendingDocs: 0 });

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const docs = await documents.getDocuments();
        setStats({
          totalDocs: docs.length,
          pendingDocs: docs.filter((d: any) => d.status !== 'ready').length,
        });
      } catch (error) {
        console.error('Failed to fetch documents', error);
      }
    };
    if (user) fetchDocs();
  }, [user]);

  if (loading) return <div className="p-8 text-center text-text-muted">Loading...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}</h1>
      <p className="text-text-muted mb-8">Here is an overview of your organization&apos;s knowledge base.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-muted font-medium">Organization</h3>
            <div className="p-2 bg-accent/10 rounded-lg text-accent">
              <IconUser size={20} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{user?.organization?.name || 'N/A'}</p>
            <p className="text-sm text-text-muted">Active Workspace</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-muted font-medium">Total Documents</h3>
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
              <IconFiles size={20} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{stats.totalDocs}</p>
            <p className="text-sm text-text-muted">Indexed and ready</p>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-text-muted font-medium">Processing</h3>
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
              <IconFileDescription size={20} />
            </div>
          </div>
          <div>
            <p className="text-3xl font-bold mb-1">{stats.pendingDocs}</p>
            <p className="text-sm text-text-muted">Documents being vectorized</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-surface border border-border p-6 rounded-2xl">
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <Link href="/upload" className="flex items-center justify-between p-4 bg-background border border-border rounded-xl hover:border-accent transition-colors group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-surface rounded-lg group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <IconUpload size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">Upload Knowledge</h4>
                  <p className="text-sm text-text-muted">Add PDFs or TXT files to your base</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
