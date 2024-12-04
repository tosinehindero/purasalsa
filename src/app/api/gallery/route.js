import { NextResponse } from "next/server";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@@/app/utils/awsS3";
import connectMongoDB from "@@/app/utils/mongo"; // Ensure MongoDB setup
import { ObjectId } from "mongodb";

const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.AWS_REGION;

if (!S3_BUCKET) {
   throw new Error("Environment variable S3_BUCKET must be defined.");
}

// Fetch all images
export async function GET() {
   try {
      const db = await connectMongoDB("galleryDB", "images");
      const images = await db.find({}).toArray();
      console.log("Fetched images from DB:", images); // Debugging

      if (!images || images.length === 0) {
         return NextResponse.json({ message: "No images found" }, { status: 404 });
      }

      return NextResponse.json(images);
   } catch (error) {
      console.error("Error fetching images:", error.message);
      return NextResponse.json(
         { error: "Failed to fetch images", details: error.message },
         { status: 500 }
      );
   }
}

// Upload a new image
export async function POST(req) {
   try {
      const db = await connectMongoDB("galleryDB", "images");
      const formData = await req.formData();
      const image = formData.get("image");

      if (!image) {
         return NextResponse.json(
            { error: "Image file is required" },
            { status: 400 }
         );
      }

      const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/svg"];
      if (!validImageTypes.includes(image.type)) {
         return NextResponse.json({ error: "Invalid image type" }, { status: 400 });
      }

      const imageBuffer = await image.arrayBuffer();
      const fileName = `gallery/${Date.now()}_${image.name}`;
      const s3Command = new PutObjectCommand({
         Bucket: S3_BUCKET,
         Key: fileName,
         Body: Buffer.from(imageBuffer),
         ContentType: image.type,
      });

      await s3.send(s3Command);

      const imageUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
      const altText = formData.get("alt") || "Gallery Image";
      const imageDetails = { url: imageUrl, alt: altText };

      await db.insertOne(imageDetails);

      return NextResponse.json({
         message: "Image uploaded successfully",
         imageDetails,
      });
   } catch (error) {
      console.error("Error uploading image:", error.message);
      return NextResponse.json(
         { error: "Failed to upload image", details: error.message },
         { status: 500 }
      );
   }
}

// Delete an image
export async function DELETE(req) {
   try {
      // Parse request body
      const body = await req.json();

      const { id } = body;
      if (!id) {
         console.error("Missing image ID");
         return NextResponse.json({ error: "Image ID is required" }, { status: 400 });
      }

      const db = await connectMongoDB("galleryDB", "images");

      // Find the image in the database
      const image = await db.findOne({ _id: new ObjectId(id) });
      if (!image) {
         console.error("Image not found in database:", id);
         return NextResponse.json({ error: "Image not found" }, { status: 404 });
      }

      // Extract the file name from the S3 URL
      const fileName = image.url.split(`${S3_BUCKET}.s3.${REGION}.amazonaws.com/`)[1];
      if (!fileName) {
         console.error("Failed to extract file name from URL:", image.url);
         return NextResponse.json({ error: "Invalid image URL" }, { status: 400 });
      }

      // Delete the file from S3
      const s3Command = new DeleteObjectCommand({ Bucket: S3_BUCKET, Key: fileName });
      await s3.send(s3Command);

      // Delete the image from the database
      await db.deleteOne({ _id: new ObjectId(id) });

      return NextResponse.json({ message: "Image deleted successfully" });
   } catch (error) {
      console.error("Error deleting image:", error.message);
      return NextResponse.json(
         { error: "Failed to delete image", details: error.message },
         { status: 500 }
      );
   }
}
