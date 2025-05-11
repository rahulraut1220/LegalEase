import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById } from "../../services/knowledge";

const ArticleViewer = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await getArticleById(articleId);

        if (response.success) {
          setArticle(response.data.article);
        } else {
          setError(response.error || "Failed to load article");
        }
      } catch (err) {
        setError("Failed to load article. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading article...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => navigate("/knowledge-base")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Knowledge Base
        </button>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-gray-600 mb-4">Article not found</div>
        <button
          onClick={() => navigate("/knowledge-base")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Back to Knowledge Base
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-6">
        <button
          onClick={() => navigate("/knowledge-base")}
          className="text-blue-600 hover:text-blue-800 mb-4 inline-flex items-center"
        >
          <svg
            className="h-5 w-5 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Knowledge Base
        </button>
      </div>

      <article className="prose max-w-none">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

        <div className="flex items-center text-sm text-gray-500 mb-6">
          <span>
            Published on {new Date(article.publishedAt).toLocaleDateString()}
          </span>
          {article.author && (
            <span className="ml-4">By {article.author.name}</span>
          )}
        </div>

        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {article.categories.map((category, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-600 text-xs px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        <div className="mb-8">
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>

        <div className="prose-lg">{article.content}</div>

        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {article.relatedArticles.map((related) => (
                <div
                  key={related.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => navigate(`/knowledge-base/${related.id}`)}
                >
                  <h3 className="text-lg font-semibold mb-2">
                    {related.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{related.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleViewer;
