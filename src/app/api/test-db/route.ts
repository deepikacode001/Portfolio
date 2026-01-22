import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';

// Test database connection and show database info
export async function GET() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    
    // Extract database name from URI (if available)
    let dbName = 'Not found';
    let cluster = 'Not found';
    
    if (mongoUri) {
      try {
        // Extract database name from URI
        const dbMatch = mongoUri.match(/mongodb\+srv:\/\/[^/]+\/([^?]+)/);
        if (dbMatch) {
          dbName = dbMatch[1];
        }
        
        // Extract cluster name
        const clusterMatch = mongoUri.match(/mongodb\+srv:\/\/[^@]+@([^/]+)/);
        if (clusterMatch) {
          cluster = clusterMatch[1];
        }
      } catch (e) {
        // Ignore parsing errors
      }
    }
    
    const dbConnection = await connectDB();
    
    if (dbConnection) {
      const connectionState = dbConnection.connection.readyState;
      const actualDbName = dbConnection.connection.db?.databaseName || 'Unknown';
      
      return NextResponse.json(
        { 
          success: true, 
          message: 'Database connected successfully!',
          connectionState: connectionState === 1 ? 'Connected' : 'Disconnected',
          databaseInfo: {
            databaseName: actualDbName,
            cluster: cluster,
            connectionState: connectionState === 1 ? 'Connected' : 'Disconnected',
            host: dbConnection.connection.host || 'Unknown',
            port: dbConnection.connection.port || 'Unknown',
          },
          environment: {
            hasMongoUri: !!mongoUri,
            uriDatabaseName: dbName,
            uriCluster: cluster,
          },
          note: 'Verify that database name matches between local and Vercel!'
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: 'MongoDB URI not configured. Please add MONGODB_URI to .env.local or Vercel Environment Variables',
          connectionState: 'Not configured',
          environment: {
            hasMongoUri: !!mongoUri,
            uriDatabaseName: dbName,
            uriCluster: cluster,
          },
          troubleshooting: {
            local: 'Check .env.local file exists and has MONGODB_URI',
            vercel: 'Check Vercel Dashboard → Settings → Environment Variables → MONGODB_URI'
          }
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
        message: 'Please check your MongoDB connection string',
        troubleshooting: {
          local: 'Check .env.local file has correct MONGODB_URI',
          vercel: 'Check Vercel Dashboard → Settings → Environment Variables',
          mongodb: 'Check MongoDB Atlas → Network Access → IP Whitelist (0.0.0.0/0)'
        }
      },
      { status: 500 }
    );
  }
}
