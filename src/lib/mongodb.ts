// lib/mongodb.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.MONGODB_DB || 'test';

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

 async function connectToDB(): Promise<Db> {
  if (cachedClient && cachedDb) {
    // Use cached connection if it exists
    console.log("✅ MongoDB connected (old connection)");
    return cachedDb;
  } 
  
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);

    cachedClient = client;
    cachedDb = db;

    console.log('✅ MongoDB connected (new connection)');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

export default connectToDB;
