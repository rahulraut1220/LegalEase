import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaUserPlus, FaEdit, FaTrash } from "react-icons/fa";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlog(response.data);
        setIsAuthor(response.data.author === localStorage.getItem("userId"));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch blog");
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${id}/like`,
        {},
        {
          withCredentials: true,
        }
      );
      setBlog(response.data);
    } catch (err) {
      console.error("Failed to like blog:", err);
    }
  };

  const handleFollow = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${id}/follow`,
        {},
        {
          withCredentials: true,
        }
      );
      setBlog(response.data);
    } catch (err) {
      console.error("Failed to follow author:", err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
          withCredentials: true,
        });
        navigate("/blogs");
      } catch (err) {
        setError("Failed to delete blog");
      }
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!blog) return <div className="text-center">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
          <span>{blog.authorName}</span>
          <span>•</span>
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span>•</span>
          <span>{blog.category}</span>
        </div>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="mb-8">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="whitespace-pre-wrap">{blog.content}</div>

        <div className="flex items-center space-x-4 mt-8 pt-8 border-t">
          <button
            onClick={handleLike}
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
            onClick={handleFollow}
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

          {isAuthor && (
            <div className="flex items-center space-x-4 ml-auto">
              <button
                onClick={() => navigate(`/blogs/edit/${id}`)}
                className="flex items-center space-x-1 text-gray-500 hover:text-blue-500 transition-colors"
              >
                <FaEdit />
                <span>Edit</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
              >
                <FaTrash />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
