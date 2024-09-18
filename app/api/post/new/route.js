import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { GridFSBucket, MongoClient } from "mongodb";
import multer from "multer";
import { Readable } from "stream";
import { NextResponse } from 'next/server';

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

  readable.pipe(uploadStream);

  return new Promise((resolve, reject) => {
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

      await newPost.save();
      resolve(NextResponse.json({ success: true, message: "Post created successfully" }, { status: 201 }));
    });
  });
}

