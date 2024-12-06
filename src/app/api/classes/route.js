import { ObjectId } from "mongodb";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import s3 from "../../utils/awsS3"; // Ensure this path is correct
import connectMongoDB from "../../utils/mongo"; // Ensure this path is correct

// S3 and MongoDB Configurations
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.AWS_REGION;

// GET: Fetch all classes
export async function GET() {
  try {
    const classesCollection = await connectMongoDB("classesDB", "classes");
    const classes = await classesCollection.find({}).toArray();

    const transformedClasses = classes.map((cls) => ({
      ...cls,
      _id: cls._id.toString(), // Ensure ObjectId is converted to string
    }));

    return NextResponse.json(transformedClasses, { status: 200 });
  } catch (error) {
    console.error("Error fetching classes:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch classes", details: error.message },
      { status: 500 }
    );
  }
}

// POST: Add a new class
export async function POST(req) {
  try {
    const classesCollection = await connectMongoDB("classesDB", "classes");

    const formData = await req.formData();
    const title = formData.get("title");
    const description = formData.get("description");
    const duration = formData.get("duration");
    const image = formData.get("image");

    if (!title || !description || !duration || !image) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Upload image to S3
    const imageBuffer = await image.arrayBuffer();
    const fileName = `classes/${Date.now()}_${image.name}`;
    const s3Command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileName,
      Body: Buffer.from(imageBuffer),
      ContentType: image.type,
    });

    await s3.send(s3Command);

    // Get public S3 URL
    const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

    const classDetails = { title, description, duration, image: imageUrl };
    await classesCollection.insertOne(classDetails);

    return NextResponse.json(
      { message: "Class added successfully", classDetails },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding class:", error.message);
    return NextResponse.json(
      { error: "Failed to process request", details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a class
export async function DELETE(req) {
  try {
    const classesCollection = await connectMongoDB("classesDB", "classes");
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing class ID" },
        { status: 400 }
      );
    }

    await classesCollection.deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error.message);
    return NextResponse.json(
      { error: "Failed to delete class", details: error.message },
      { status: 500 }
    );
  }
}
