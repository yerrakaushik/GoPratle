import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      state: 'connected',
      isMemoryDB: true,
      host: 'vercel-edge-runtime',
      name: 'gopratle-preview',
    },
  });
}
