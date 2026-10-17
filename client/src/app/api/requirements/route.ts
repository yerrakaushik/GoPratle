import { NextRequest, NextResponse } from 'next/server';
import { addRequirement, getStore } from '../store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const eventType = searchParams.get('eventType');
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)));

    let items = [...getStore()];

    // Filter by category
    if (category && ['planner', 'performer', 'crew'].includes(category)) {
      items = items.filter((item) => item.category === category);
    }

    // Filter by event type
    if (eventType) {
      items = items.filter((item) =>
        item.eventType.toLowerCase().includes(eventType.toLowerCase())
      );
    }

    // Search query
    if (search && search.trim() !== '') {
      const q = search.trim().toLowerCase();
      items = items.filter(
        (item) =>
          item.eventName.toLowerCase().includes(q) ||
          item.location.toLowerCase().includes(q) ||
          (item.venue && item.venue.toLowerCase().includes(q)) ||
          item.eventType.toLowerCase().includes(q)
      );
    }

    const total = items.length;
    const skip = (page - 1) * limit;
    const paginatedItems = items.slice(skip, skip + limit);

    return NextResponse.json({
      success: true,
      count: paginatedItems.length,
      total,
      page,
      totalPages: Math.ceil(total / limit) || 1,
      data: paginatedItems,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.eventName || body.eventName.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: 'Event name is required (at least 3 characters)' },
        { status: 400 }
      );
    }

    if (!body.category || !['planner', 'performer', 'crew'].includes(body.category)) {
      return NextResponse.json(
        { success: false, message: 'Valid category (planner, performer, or crew) is required' },
        { status: 400 }
      );
    }

    const created = addRequirement(body);

    return NextResponse.json(
      {
        success: true,
        message: `Requirement successfully posted under category '${created.category}'`,
        data: created,
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to process requirement submission' },
      { status: 500 }
    );
  }
}
