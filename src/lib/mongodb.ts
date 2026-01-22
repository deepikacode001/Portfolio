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
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // @ts-expect-error - mongoose.connect returns Promise<typeof mongoose>
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("✅ MongoDB connected successfully");
      return mongoose;
    }).catch((error) => {
      console.error("❌ MongoDB connection error:", error);
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
