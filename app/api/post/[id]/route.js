import mongoose from "mongoose";
import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { GridFSBucket, MongoClient, ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    
    const post = await Post.findById(params.id).populate("creator");
    if (!post) return new Response("Post not found.", { status: 404 });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch post", error);
    return new Response("Failed to fetch post", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();
    
    const { title, media, tag } = await req.json();
    
    const existingPost = await Post.findById(params.id);
    if (!existingPost) return new Response("Post not found.", { status: 404 });

    existingPost.title = title !== undefined ? title : existingPost.title;
    existingPost.media = media !== undefined ? media : existingPost.media;
    existingPost.tag = tag !== undefined ? tag : existingPost.tag;

    await existingPost.save();
    return new Response("Successfully updated the post", { status: 200 });
  } catch (error) {
    console.error("Failed to update post", error);
    return new Response("Failed to update post", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id);
    if (!post) return new Response("Post not found.", { status: 404 });

    const imageId = post.media.split('/').pop();

    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const bucket = new GridFSBucket(db);

    if (ObjectId.isValid(imageId)) {
      await bucket.delete(new ObjectId(imageId));
    } else {
      return new Response("Invalid image ID.", { status: 400 });
    }

    await Post.findByIdAndDelete(params.id);
    return new Response("Post deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Failed to delete post", error);
    return new Response("Failed to delete post", { status: 500 });
  }
};
