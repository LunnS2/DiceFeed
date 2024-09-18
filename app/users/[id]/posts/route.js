import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    
    const posts = await Post.find({
      creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts created by user:", error);
    return new Response("Failed to fetch posts created by user", { status: 500 });
  }
};
