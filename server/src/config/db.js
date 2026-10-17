import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

let isMemoryServer = false;
let memoryServerInstance = null;

export const connectDB = async () => {
  const customUri = process.env.MONGODB_URI;

  // 1. Try Custom URI (e.g., MongoDB Atlas or user specified)
  if (customUri) {
    try {
      console.log('🔄 Attempting to connect to configured MONGODB_URI...');
      const conn = await mongoose.connect(customUri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB connected successfully to: ${conn.connection.host}/${conn.connection.name}`);
      return conn;
    } catch (err) {
      console.warn(`⚠️ Failed to connect to configured MONGODB_URI: ${err.message}`);
    }
  }

  // 2. Try Local MongoDB (if running)
  try {
    console.log('🔄 Attempting connection to local MongoDB instance (mongodb://127.0.0.1:27017/gopratle)...');
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/gopratle', {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`✅ Local MongoDB connected to: ${conn.connection.host}/${conn.connection.name}`);
    return conn;
  } catch (err) {
    console.log('ℹ️ Local MongoDB instance not detected. Falling back to in-memory MongoDB server...');
  }

  // 3. Fallback to MongoDB Memory Server for zero-config local testing/evaluation
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServerInstance = await MongoMemoryServer.create({
      instance: {
        dbName: 'gopratle_test',
      },
    });
    const memoryUri = memoryServerInstance.getUri();
    isMemoryServer = true;
    const conn = await mongoose.connect(memoryUri);
    console.log(`✅ MongoDB Memory Server started and connected at: ${memoryUri}`);
    return conn;
  } catch (err) {
    console.error(`❌ Could not start MongoDB Memory Server: ${err.message}`);
    throw err;
  }
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServerInstance) {
    await memoryServerInstance.stop();
  }
};

export const isUsingMemoryDB = () => isMemoryServer;
