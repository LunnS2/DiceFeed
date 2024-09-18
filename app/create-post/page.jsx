"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  
  const [post, setPost] = useState({
    title: "",
    image: null,
    tag: "",
  });

  const validatePost = () => {
    return post.title && post.image && post.tag;
  };

  const createPrompt = async (e) => {
    e.preventDefault();

    if (!validatePost()) {
      console.error("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('image', post.image);
    formData.append('tag', post.tag);
    formData.append('userId', session?.user.id);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorText = await response.text();
        console.error("Failed to create post:", errorText);
      }
    } catch (error) {
      console.error("Error creating post:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form 
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePost;

