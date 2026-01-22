import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// @ts-ignore - Global mongoose cache
let cached = global.mongoose;

if (!cached) {
  // @ts-ignore - Initialize global cache
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB(): Promise<typeof mongoose | null> {
  // If MongoDB URI is not set, return null (will be handled in API route)
  if (!MONGODB_URI) {
    console.warn("⚠️ MONGODB_URI not set. Database operations will be skipped.");
    return null;
  }

  // Return cached connection if available
  if (cached.conn) {
    // Check if connection is still alive
    // @ts-expect-error - cached.conn is typeof mongoose, TypeScript inference issue
    const connectionState = cached.conn.connection?.readyState;
    if (connectionState === 1) {
      // @ts-expect-error - cached.conn is typeof mongoose, TypeScript inference issue
      return cached.conn;
    } else {
      // Connection is dead, reset cache
      cached.conn = null;
      cached.promise = null;
    }
  }

  // Create new connection promise if not exists
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // Increased from 5000 to 30000 for DNS resolution
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // Added connection timeout
      // DNS resolution options
      family: 4, // Force IPv4 (can help with DNS issues)
    };

    // @ts-expect-error - mongoose.connect returns Promise<typeof mongoose>
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    }).catch((error: any) => {
      console.error(" MongoDB connection error:", error);
      
      // Specific error handling for DNS issues
      if (error.code === 'ENOTFOUND' || error.message?.includes('querySrv ENOTFOUND')) {
        console.error(" DNS Resolution Error - Cannot resolve MongoDB cluster hostname");
        console.error(" Troubleshooting steps:");
        console.error("   1. Check your internet connection");
        console.error("   2. Verify MongoDB Atlas cluster is not paused");
        console.error("   3. Check firewall/VPN settings");
        console.error("   4. Try using Google DNS (8.8.8.8) or Cloudflare DNS (1.1.1.1)");
        console.error("   5. Verify cluster hostname in MONGODB_URI (should be cluster0.gan8wir.mongodb.net)");
      }
      
      cached.promise = null;
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ Failed to establish MongoDB connection:", e);
    throw e;
  }

  // @ts-expect-error - cached.conn is typeof mongoose, TypeScript inference issue
  return cached.conn;
}

export default connectDB;
