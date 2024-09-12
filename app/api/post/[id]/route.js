import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { GridFSBucket, MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("dice_feed");
const bucket = new GridFSBucket(db);

export const GET = async (request, { params }) => {
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

export const PATCH = async (request, { params }) => {
  const { title, media, tag } = await request.json();

  try {
    await connectToDB();
    
    const existingPost = await Post.findById(params.id);
    if (!existingPost) return new Response("Post not found.", { status: 404 });

    existingPost.title = title || existingPost.title;
    existingPost.media = media || existingPost.media;
    existingPost.tag = tag || existingPost.tag;

    await existingPost.save();

    return new Response("Successfully updated the post", { status: 200 });
  } catch (error) {
    console.error("Failed to update post", error);
    return new Response("Failed to update post", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id);
    if (!post) return new Response("Post not found.", { status: 404 });

    const imageId = post.media.split('/').pop();
    bucket.delete(new mongoose.Types.ObjectId(imageId));

    await Post.findByIdAndDelete(params.id);

    return new Response("Post deleted successfully.", { status: 200 });
  } catch (error) {
    console.error("Failed to delete post", error);
    return new Response("Failed to delete post", { status: 500 });
  }
};
