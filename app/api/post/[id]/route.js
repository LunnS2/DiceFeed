import { connectToDB } from "@utils/database";
import Post from "@models/post";

export const GET = async (request, {params}) => {
  try {
    await connectToDB();

    const post = await Post.findById(params.id).populate("creator");
    if(!post) return new Response("Post not found.", {status: 404})

    return new Response(JSON.stringify(post), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch all posts.", {status: 500})
  }
}

export const PATCH = async (request, {params}) => {
  const {post, tag} = await request.json();

  try {
    await connectToDB();
    
    const existingPost = await Post.findById(params.id);

    if(!existingPost) return new Response("Post not found.", {status: 404})

    existingPost.post = post;
    existingPost.tag = tag;

    await existingPost.save();

    return new Response("Successfully updated the Posts", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the post.", {status: 500})
  }
}

export const DELETE = async (request, {params}) => {
  
  try {
    await connectToDB();

    await Post.findByIdAndDelete(params.id);

    return new Response ("Prompt deleted successfully.", {status: 200})
  } catch (error) {
    return new Response("Failed to delete prompt.", {status: 500})
  }

}