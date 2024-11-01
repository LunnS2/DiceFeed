// my-next-app\components\Profile.jsx

import { useSession } from "next-auth/react";
import UserPost from "./Post";
import Image from "next/image";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  
  return (
    <section className='flex w-full text-center'>
      <h1 className='text-left'>
        <span>{name} Profile</span>
      </h1>
      <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left'>{desc}</p>
      <Image
            src={session?.user?.image || "/default-profile.png"}
            alt={`${session?.user?.username || "User"}'s profile`}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

      <div className='mt-10'>
        {data.map((post) => (
          <UserPost
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;