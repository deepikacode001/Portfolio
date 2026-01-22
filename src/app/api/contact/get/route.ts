import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { getAuthUser } from '@/lib/auth';

// GET all contact submissions (for admin view)
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const user = getAuthUser(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to database with proper error handling
    const db = await connectDB();
    if (!db) {
      return NextResponse.json(
        { 
          error: 'Database connection failed',
          message: 'MongoDB URI not configured. Please check environment variables.'
        },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || 'all'; // all, open, closed

    // Build query
    let query: any = {};
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
      ];
    }

    // Status filter
    if (status === 'open') {
      query.read = false;
    } else if (status === 'closed') {
      query.read = true;
    }

    // Get stats
    const total = await Contact.countDocuments();
    const open = await Contact.countDocuments({ read: false });
    const closed = await Contact.countDocuments({ read: true });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: today },
    });

    // Get filtered count
    const filteredTotal = await Contact.countDocuments(query);

    // Get contacts with pagination and filters
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 }) // Newest first
      .skip(skip)
      .limit(limit)
      .select('-__v') // Exclude version key
      .lean();

    return NextResponse.json(
      {
        success: true,
        data: contacts,
        stats: {
          total,
          open,
          closed,
          today: todayCount,
        },
        pagination: {
          page,
          limit,
          total: filteredTotal,
          pages: Math.ceil(filteredTotal / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}
