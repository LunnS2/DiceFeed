import Link from "next/link";
import { useState } from "react";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPost({ ...post, image: file });
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        <span className="text-blue-500">{type} Post</span>
      </h1>
      <p className="text-gray-600 mb-6">
        {type} Let your imagination run wild with an image post!
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Post Title</label>
          <input
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            type="text"
            placeholder="Enter the title of your post"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Upload Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Post Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
          />
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Image preview"
                className="w-full h-auto max-w-xs rounded-md border border-gray-300 shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Tag Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Field of Prompt{" "}
            <span className="font-normal text-gray-500">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </label>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className={`px-5 py-2 text-sm font-medium rounded-full text-white transition ${
              submitting ? 'bg-gray-400' : 'bg-orange-500 hover:bg-orange-600'
            }`}
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
