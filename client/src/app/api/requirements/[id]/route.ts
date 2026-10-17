import { NextRequest, NextResponse } from 'next/server';
import { getStore } from '../../store';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const items = getStore();
    const doc = items.find((item) => item._id === id);

    if (!doc) {
      return NextResponse.json(
        { success: false, message: `Requirement not found with ID ${id}` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: doc,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || 'Error fetching requirement' },
      { status: 500 }
    );
  }
}
