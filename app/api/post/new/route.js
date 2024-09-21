import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { GridFSBucket, MongoClient } from "mongodb";
import { Readable } from "stream";
import { NextResponse } from 'next/server';

export async function POST(req) {
  const formData = await req.formData();

  const title = formData.get('title');
  const tag = formData.get('tag');
  const userId = formData.get('userId');
  const file = formData.get('image');

  if (!title || !file || !tag || !userId) {
    return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
  }

  await connectToDB();

  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const bucket = new GridFSBucket(db, { bucketName: "images" });

  const uploadStream = bucket.openUploadStream(file.name);
  const readable = Readable.from(file.stream());

  return new Promise((resolve) => {
    readable.pipe(uploadStream);

    uploadStream.on('error', () => {
      resolve(NextResponse.json({ success: false, message: "Failed to upload image" }, { status: 500 }));
    });

    uploadStream.on('finish', async () => {
      const newPost = new Post({
        title,
        media: uploadStream.id,
        tag,
        creator: userId
      });

      try {
        await newPost.save();
        resolve(NextResponse.json({ success: true, message: "Post created successfully" }, { status: 201 }));
      } catch (error) {
        console.error("Failed to save post:", error);
        resolve(NextResponse.json({ success: false, message: "Failed to save post" }, { status: 500 }));
      }
    });
  });
}




