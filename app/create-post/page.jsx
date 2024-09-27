// my-next-app\app\create-post\page.jsx

"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form";

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
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
      setError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('image', post.image);
    formData.append('tag', post.tag);

    try {
      const response = await fetch("/api/post/new", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/");
      } else {
        const errorText = await response.text();
        setError("Failed to create post: " + errorText);
        console.error("Failed to create post:", errorText);
      }
    } catch (error) {
      setError("Error creating post: " + error.message);
      console.error("Error creating post:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form 
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={createPrompt}
      />
    </>
  );
};

export default CreatePost;
