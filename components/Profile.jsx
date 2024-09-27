// my-next-app\components\Profile.jsx

import UserPost from "./Post";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    <section className='w-full'>
      <h1 className='text-left'>
        <span>{name} Profile</span>
      </h1>
      <p className='mt-5 text-lg text-gray-600 sm:text-xl max-w-2xl text-left'>{desc}</p>

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