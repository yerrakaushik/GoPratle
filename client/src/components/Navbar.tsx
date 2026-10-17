'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Calendar, Layers, Server, Database } from 'lucide-react';
import { api } from '../services/api';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [healthStatus, setHealthStatus] = useState<{
    online: boolean;
    dbState: string;
    isMemory: boolean;
  }>({
    online: false,
    dbState: 'checking...',
    isMemory: false,
  });

  useEffect(() => {
    let isMounted = true;
    const checkServerHealth = async () => {
      try {
        const res = await api.checkHealth();
        if (isMounted) {
          setHealthStatus({
            online: res.status === 'healthy',
            dbState: res.database.state,
            isMemory: res.database.isMemoryDB,
          });
        }
      } catch (err) {
        if (isMounted) {
          setHealthStatus({
            online: false,
            dbState: 'offline',
            isMemory: false,
          });
        }
      }
    };

    checkServerHealth();
    const interval = setInterval(checkServerHealth, 10000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors">
                GoPratle
              </span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-950 border border-indigo-800 text-indigo-300">
                Event Engine
              </span>
            </div>
          </Link>

          {/* Navigation items */}
          <nav className="flex items-center gap-1 sm:gap-3">
            <Link
              href="/"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Post Requirement</span>
            </Link>

            <Link
              href="/postings"
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                pathname === '/postings'
                  ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Browse Postings</span>
            </Link>

            {/* Health pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${
                  healthStatus.online
                    ? 'bg-emerald-500 shadow-[0_0_8px_#10B981]'
                    : 'bg-rose-500 animate-pulse'
                }`}
              />
              <span className="text-neutral-400 flex items-center gap-1">
                <Server className="w-3 h-3 text-neutral-500" />
                {healthStatus.online ? 'API Online' : 'Connecting API...'}
              </span>
              <span className="text-neutral-600">•</span>
              <span className="text-neutral-400 flex items-center gap-1">
                <Database className="w-3 h-3 text-neutral-500" />
                {healthStatus.isMemory ? 'MongoDB (In-Memory Dev)' : 'MongoDB Connected'}
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
