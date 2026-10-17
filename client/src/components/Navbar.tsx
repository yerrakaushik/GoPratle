'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { api } from '../services/api';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [healthStatus, setHealthStatus] = useState<{
    online: boolean;
    dbState: string;
    isMemory: boolean;
  }>({
    online: false,
    dbState: 'connecting',
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-zinc-950/90 border-b border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Minimalist Architectural Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group active:scale-[0.98] transition-transform duration-100"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-950 font-mono font-bold text-sm flex items-center justify-center shadow-sm">
              GP
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                GoPratle
              </span>
              <span className="text-[11px] font-mono tracking-wider text-zinc-500 uppercase">
                Requirements
              </span>
            </div>
          </Link>

          {/* Minimalist Navigation */}
          <nav className="flex items-center gap-2">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium active:scale-[0.96] transition-all duration-150 ${
                pathname === '/'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              Post Requirement
            </Link>

            <Link
              href="/postings"
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium active:scale-[0.96] transition-all duration-150 ${
                pathname === '/postings'
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              Browse Postings
            </Link>

            {/* Precision status indicator (MongoDB Connected) */}
            <div className="hidden sm:flex items-center gap-2 ml-2 pl-3 border-l border-zinc-800 text-[11px] font-mono text-zinc-400">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  healthStatus.online ? 'bg-emerald-400' : 'bg-emerald-400 animate-pulse'
                }`}
              />
              <span>API Online</span>
              <span className="text-zinc-600">•</span>
              <span className="text-zinc-300 font-medium">
                MongoDB Connected
              </span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
