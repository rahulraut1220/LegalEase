import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaUserPlus } from "react-icons/fa";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const handleLike = async (blogId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      setBlogs(
        blogs.map((blog) => (blog._id === blogId ? response.data : blog))
      );
    } catch (err) {
      console.error("Failed to like blog:", err);
    }
  };

  const handleFollow = async (blogId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/follow`,
        {},
        {
          withCredentials: true,
        }
      );
      setBlogs(
        blogs.map((blog) => (blog._id === blogId ? response.data : blog))
      );
    } catch (err) {
      console.error("Failed to follow author:", err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Legal Blogs</h1>
      <div className="space-y-8">
        {blogs.map((blog) => (
          <article key={blog._id} className="border-b pb-8">
            <div className="flex items-start space-x-4">
              <div className="flex-1">
                <Link to={`/blogs/${blog._id}`} className="block">
                  <h2 className="text-2xl font-bold mb-2 hover:text-blue-600 transition-colors">
                    {blog.title}
                  </h2>
                </Link>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {blog.content}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{blog.authorName}</span>
                  <span>•</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{blog.category}</span>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <button
                    onClick={() => handleLike(blog._id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                  >
                    <FaHeart
                      className={
                        blog.likes.includes(localStorage.getItem("userId"))
                          ? "text-red-500"
                          : ""
                      }
                    />
                    <span>{blog.likes.length}</span>
                  </button>
                  <button
                    onClick={() => handleFollow(blog._id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    <FaUserPlus
                      className={
                        blog.followers.includes(localStorage.getItem("userId"))
                          ? "text-blue-500"
                          : ""
                      }
                    />
                    <span>Follow</span>
                  </button>
                </div>
              </div>
              {blog.image && (
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
