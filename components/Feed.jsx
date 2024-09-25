"use client";

import React, { useState, useEffect } from "react";
import UserPost from "./Post";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/feed");
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleEdit = async (id) => {
    // Edit logic
    console.log("Edit post", id);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete post");

      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return <div>Loading posts...</div>;
  }

  return (
    <section className="feed w-full max-w-5xl mx-auto py-8">
      <div>
        <h1 className="text-center text-4xl font-bold mb-6">FEED</h1>
        <div className="flex flex-col gap-6">
          {posts.length === 0 ? (
            <p>No posts available.</p>
          ) : (
            posts.map((post) => (
              <UserPost
                key={post._id}
                post={post}
                handleEdit={() => handleEdit(post._id)}
                handleDelete={() => handleDelete(post._id)}
                handleTagClick={(tag) => console.log(`Clicked on tag: ${tag}`)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Feed;
