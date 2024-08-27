import { connectToDB } from "@utils/database";
import Post from "@models/prompt";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();
    
    const posts = await Post.find({
      creator: params.id
    }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch prompts created by user", {status: 500})
  }
}