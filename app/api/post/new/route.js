import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { GridFSBucket, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("dice_feed");
const bucket = new GridFSBucket(db);

export const POST = async (request) => {
  try {
    await connectToDB();

    const formData = new FormData(await request.text());
    const title = formData.get('title');
    const tag = formData.get('tag');
    const userId = formData.get('userId');
    const image = formData.get('image');

    const uploadStream = bucket.openUploadStream(image.name);
    image.stream.pipe(uploadStream);

    const mediaURL = `/api/files/${uploadStream.id}`;

    const newPost = new Post({
      creator: userId,
      title,
      media: mediaURL,
      tag,
    });

    await newPost.save();

    return new Response("Post created successfully", { status: 201 });
  } catch (error) {
    console.error("Failed to create post", error);
    return new Response("Failed to create post", { status: 500 });
  }
};
