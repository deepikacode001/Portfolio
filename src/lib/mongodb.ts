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
    return null;
  }

  if (cached.conn) {
    // @ts-expect-error - cached.conn is typeof mongoose, TypeScript inference issue
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // @ts-expect-error - mongoose.connect returns Promise<typeof mongoose>
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  // @ts-expect-error - cached.conn is typeof mongoose, TypeScript inference issue
  return cached.conn;
}

export default connectDB;
