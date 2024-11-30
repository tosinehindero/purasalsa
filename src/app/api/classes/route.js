import { MongoClient, ObjectId } from "mongodb";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.AWS_REGION;

const s3 = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const mongoUri = process.env.MONGO_URI;
const client = new MongoClient(mongoUri);

async function connectMongoDB() {
  if (!client.isConnected()) await client.connect();
  return client.db("classesDB").collection("classes");
}

// GET: Fetch all classes
export async function GET() {
  const collection = await connectMongoDB();
  const classes = await collection.find({}).toArray();
  return NextResponse.json(classes);
}

// POST: Add a new class
export async function POST(req) {
  const collection = await connectMongoDB();

  // Parse FormData from request
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const duration = formData.get("duration");
  const image = formData.get("image");

  if (!title || !description || !duration || !image) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Upload image to S3
  const imageBuffer = await image.arrayBuffer();
  const fileName = `classes/${Date.now()}_${image.name}`;
  const s3Command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileName,
    Body: Buffer.from(imageBuffer),
    ContentType: image.type,
    ACL: "public-read",
  });

  await s3.send(s3Command);

  // Get public S3 URL
  const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

  // Save class details to MongoDB
  const classDetails = {
    title,
    description,
    duration,
    image: imageUrl,
  };

  await collection.insertOne(classDetails);

  return NextResponse.json({ message: "Class added successfully", classDetails }, { status: 201 });
}

// DELETE: Remove a class
export async function DELETE(req) {
  const collection = await connectMongoDB();
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json({ error: "Missing class ID" }, { status: 400 });
  }

  await collection.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ message: "Class deleted successfully" });
}

