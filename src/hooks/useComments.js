import { useState, useEffect, useCallback } from "react";
import { commentService } from "../services/commentService";

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("recent");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!videoId) return;
    fetchComments();
  }, [videoId, sortBy]);

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await commentService.getVideoComments(videoId);
      let list = data?.data?.comments || data?.data || [];
      list = Array.isArray(list) ? list : [];

      // Sort on frontend
      if (sortBy === "recent") {
        list = [...list].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      } else {
        list = [...list].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      }

      setComments(list);
      setTotal(list.length);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  }, [videoId, sortBy]);

  const addComment = async (content) => {
    try {
      const data = await commentService.addComment(videoId, content);
      const newComment = data?.data;

      if (newComment) {
        // Instantly add to top
        const commentWithUser = {
          ...newComment,
          owner:
            newComment.owner ||
            JSON.parse(localStorage.getItem("user") || "{}"),
          createdAt: newComment.createdAt || new Date().toISOString(),
        };
        setComments((prev) =>
          sortBy === "recent"
            ? [commentWithUser, ...prev]
            : [...prev, commentWithUser],
        );
        setTotal((prev) => prev + 1);
      }
      return true;
    } catch (err) {
      throw err;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      setTotal((prev) => prev - 1);
    } catch (err) {
      throw err;
    }
  };

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    sortBy,
    setSortBy,
    total,
  };
};

export default useComments;
