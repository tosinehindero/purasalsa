import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI; // Ensure this is correctly set in your .env file

if (!uri) {
  throw new Error("Environment variable MONGO_URI must be defined.");
}

let client;
let clientPromise;

// Use a global variable to cache the MongoDB client promise for hot-reloading in development
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, create a new client instance
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Connect to MongoDB and return the desired collection
async function connectMongoDB(dbName, collectionName) {
  const db = (await clientPromise).db(dbName);
  return db.collection(collectionName);
}

export default connectMongoDB;




