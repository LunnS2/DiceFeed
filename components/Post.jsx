"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const UserPost = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  // Check session loading state
  if (session?.status === 'loading') return <div>Loading...</div>;

  const handleProfileClick = () => {
    if (post?.creator?._id === session?.user.id) {
      router.push("/profile");
    } else {
      router.push(`/profile/${post?.creator?._id}?name=${post?.creator?.username}`);
    }
  };

  const handleCopy = () => {
    if (post?.content) {
      navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000); // Reset copied status after 3 seconds
    }
  };

  return (
    <div className="flex-1 break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      {/* User Info Section */}
      <div className="flex justify-between items-start gap-5">
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

        {/* Copy to Clipboard Button */}
        <div
          className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
          onClick={handleCopy}
        >
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            alt={copied ? "Copied to clipboard" : "Copy to clipboard"}
            width={12}
            height={12}
          />
        </div>
      </div>

      {/* Post Content */}
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post?.content || "No content available"}
      </p>

      {/* Tag Section */}
      <p
        className="font-inter text-sm cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag ? `#${post.tag}` : "#NoTag"}
      </p>

      {/* Edit/Delete Options */}
      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm cursor-pointer text-red-500"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default UserPost;



