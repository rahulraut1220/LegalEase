import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHeart, FaUserPlus, FaSearch } from "react-icons/fa";

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "all",
    "Criminal Law",
    "Civil Law",
    "Corporate Law",
    "Family Law",
    "Property Law",
    "Other",
  ];

  useEffect(() => {
    fetchBlogs();
  }, [selectedCategory]);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const url =
        selectedCategory === "all"
          ? "http://localhost:5000/api/blogs"
          : `http://localhost:5000/api/blogs/category/${selectedCategory}`;

      const response = await axios.get(url);
      setBlogs(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/blogs/${blogId}/like`,
        {},
        { withCredentials: true }
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
        { withCredentials: true }
      );
      setBlogs(
        blogs.map((blog) => (blog._id === blogId ? response.data : blog))
      );
    } catch (err) {
      console.error("Failed to follow author:", err);
    }
  };

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Legal Blogs</h1>
        <Link
          to="/blogs/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Create New Blog
        </Link>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog) => (
          <article
            key={blog._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <Link to={`/blogs/${blog._id}`} className="block">
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>
              </Link>
              <p className="text-gray-600 mb-4 line-clamp-3">{blog.content}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{blog.authorName}</span>
                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center space-x-4 mt-4 pt-4 border-t">
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
          </article>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          No blogs found matching your search criteria.
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
