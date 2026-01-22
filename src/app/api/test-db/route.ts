import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// Test database connection
export async function GET() {
  try {
    const dbConnection = await connectDB();
    
    if (dbConnection) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Database connected successfully!',
          connectionState: dbConnection.connection.readyState === 1 ? 'Connected' : 'Disconnected'
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'MongoDB URI not configured. Please add MONGODB_URI to .env.local',
          connectionState: 'Not configured'
        },
        { status: 200 }
      );
    }
  } catch (error: any) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Failed to connect to database',
        message: 'Please check your MongoDB connection string in .env.local'
      },
      { status: 500 }
    );
  }
}
