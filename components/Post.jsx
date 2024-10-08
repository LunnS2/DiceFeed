// my-next-app\app\components\UserPost.js

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const UserPost = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  // Loading state while session is being fetched
  if (session?.status === "loading") {
    return <div>Loading...</div>;
  }

  // Navigate to the appropriate profile page
  const handleProfileClick = () => {
    const profilePath =
      post?.creator?._id === session?.user.id
        ? "/profile"
        : `/profile/${post?.creator?._id}?name=${post?.creator?.username}`;
    router.push(profilePath);
  };

  return (
    <div className="flex flex-col items-center break-inside-avoid rounded-lg border border-gray-300 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 w-full max-w-md mx-auto mb-6">
      {/* User Info Section */}
      <div className="flex justify-between items-start gap-5 w-full">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={post?.creator?.image || "/default-profile.png"}
            alt={`${post?.creator?.username || "User"}'s profile`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username || "Unknown User"}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email || "No email provided"}
            </p>
          </div>
        </div>
      </div>
      {/* Post Title */}
      <h2 className="font-bold text-xl text-gray-900 mt-2 text-center">
        {post?.title || "Untitled Post"}
      </h2>
      {/* Post Media */}
      {post?.media ? (
        <div className="my-4">
          <Image
            src={`/api/images/${post.media}`}
            alt={post?.title || "Post Media"}
            width={360}
            height={240}
            className="rounded-lg object-cover"
          />
        </div>
      ) : (
        <p className="text-sm text-gray-500">No media available</p>
      )}
      {/* Post Content */}
      <p className="my-4 font-satoshi text-sm text-gray-700 text-center">
        {post?.content || "No content available"}
      </p>
      {/* Tag Section */}
      <p
        className="font-inter text-sm cursor-pointer text-blue-500 hover:underline"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag ? `#${post.tag}` : "#NoTag"}
      </p>
      {/* Edit/Delete Options */}
      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex gap-4 border-t border-gray-200 pt-4">
          <button onClick={handleEdit} className="text-blue-500 hover:underline">
            Edit
          </button>
          <button onClick={handleDelete} className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default UserPost;
