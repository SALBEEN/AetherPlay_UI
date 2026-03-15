import { useState, useEffect } from "react";
import { commentService } from "../services/commentService";

const useComments = (videoId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!videoId) return;
    fetchComments();
  }, [videoId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await commentService.getVideoComments(videoId);
      const list = data?.data?.comments || data?.data || [];
      setComments(Array.isArray(list) ? list : []);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load comments");
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const addComment = async (content) => {
    try {
      await commentService.addComment(videoId, content);
      // Refetch all comments to get populated owner data
      await fetchComments();
      return true;
    } catch (err) {
      throw err;
    }
  };

  const deleteComment = async (commentId) => {
    try {
      await commentService.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
    } catch (err) {
      throw err;
    }
  };

  return { comments, loading, error, addComment, deleteComment };
};

export default useComments;
