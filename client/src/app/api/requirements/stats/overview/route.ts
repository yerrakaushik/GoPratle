import { NextResponse } from 'next/server';
import { getStore } from '../../../store';

export async function GET() {
  try {
    const items = getStore();

    const plannerCount = items.filter((i) => i.category === 'planner').length;
    const performerCount = items.filter((i) => i.category === 'performer').length;
    const crewCount = items.filter((i) => i.category === 'crew').length;

    return NextResponse.json({
      success: true,
      data: {
        total: items.length,
        categories: {
          planner: plannerCount,
          performer: performerCount,
          crew: crewCount,
        },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error fetching stats' },
      { status: 500 }
    );
  }
}
