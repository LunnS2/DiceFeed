import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (req) => {
  console.log("GET /api/feed called");

  try {
    await connectToDB();
    const posts = await Post.find().populate("creator");
    console.log("Posts fetched:", posts.map(post => ({ id: post._id, media: post.media })));
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return new Response("Failed to fetch posts", { status: 500 });
  }
};
