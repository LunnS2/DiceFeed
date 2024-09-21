"use client";

import { useEffect, useState } from "react";
import UserPost from "../components/Post";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
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

  if (loading) {
    return <div>Loading posts...</div>;
  }

  console.log(posts)

  return (
    <section className="feed w-full max-w-5xl mx-auto py-8">
      <h1 className="text-center text-4xl font-bold mb-6">FEED</h1>
      <div className="post-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <UserPost
              key={post._id}
              post={post}
              handleTagClick={(tag) => console.log(`Clicked on tag: ${tag}`)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default FeedPage;