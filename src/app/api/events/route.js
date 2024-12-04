import { PutObjectCommand } from "@aws-sdk/client-s3";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import s3 from "@@/app/utils/awsS3";
import connectMongoDB from "@@/app/utils/mongo";

// S3 and MongoDB Configurations
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.AWS_REGION;

// GET: Fetch all events
export async function GET() {
  try {
    const eventsCollection = await connectMongoDB("eventsDB", "events"); // Use the correct database and collection
    const events = await eventsCollection.find({}).toArray();

    if (!events || events.length === 0) {
      return NextResponse.json({ message: "No events found" }, { status: 404 });
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch events", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
     const eventsCollection = await connectMongoDB("eventsDB", "events");

     // Parse FormData for event details
     const formData = await req.formData();
     const title = formData.get("title");
     const date = formData.get("date");
     const location = formData.get("location");
     const description = formData.get("description");
     const image = formData.get("image");

     if (!title || !date || !location || !description || !image) {
        return NextResponse.json(
           { error: "Missing required fields" },
           { status: 400 }
        );
     }

     // Upload image to S3
     const imageBuffer = await image.arrayBuffer();
     const fileName = `events/${Date.now()}_${image.name}`;
     const s3Command = new PutObjectCommand({
        Bucket: S3_BUCKET,
        Key: fileName,
        Body: Buffer.from(imageBuffer),
        ContentType: image.type,
     });

     await s3.send(s3Command);

     // Get public S3 URL
     const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;

     // Save event details to MongoDB
     const eventDetails = {
        title,
        date,
        location,
        description,
        image: imageUrl,
     };

     await eventsCollection.insertOne(eventDetails);

     return NextResponse.json(
        { message: "Event added successfully", eventDetails },
        { status: 201 }
     );
  } catch (error) {
     console.error("Error adding event:", error);
     return NextResponse.json(
        { error: "Failed to process request", details: error.message },
        { status: 500 }
     );
  }
}

// DELETE: Remove an event
export async function DELETE(req) {
  try {
     const eventsCollection = await connectMongoDB("eventsDB", "events");
     const { id } = await req.json();

     if (!id) {
        return NextResponse.json(
           { error: "Missing event ID" },
           { status: 400 }
        );
     }

     await eventsCollection.deleteOne({ _id: new ObjectId(id) });
     return NextResponse.json({ message: "Event deleted successfully" });
  } catch (error) {
     console.error("Error deleting event:", error);
     return NextResponse.json(
        { error: "Failed to delete event", details: error.message },
        { status: 500 }
     );
  }
}