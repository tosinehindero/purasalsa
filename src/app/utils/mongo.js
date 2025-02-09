import { MongoClient } from "mongodb";

// Choose the connection string based on the environment.
const uri =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI;

if (!uri) {
  throw new Error(
    "MongoDB connection string is not defined. " +
    "Please define MONGO_URI_DEV (for development) or MONGO_URI_PROD (for production)."
  );
}

let client;
let clientPromise;

// Use a global variable to cache the MongoDB client promise for hot-reloading in development.
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // For production, create a new client instance.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Connect to MongoDB and return the desired collection.
async function connectMongoDB(dbName, collectionName) {
  const db = (await clientPromise).db(dbName);
  return db.collection(collectionName);
}

export default connectMongoDB;


