import { useState } from "react";
import Avatar from "./Avatar";
import Button from "../common/Button";
import toast from "react-hot-toast";

const CommentBox = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const handleSubmit = async () => {
    if (!content.trim()) return;
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to comment");
      return;
    }
    try {
      setLoading(true);
      await onAdd(content.trim());
      setContent("");
      setFocused(false);
      toast.success("Comment added!");
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setContent("");
    setFocused(false);
  };

  return (
    <div className="flex gap-3">
      <Avatar src={currentUser?.avatar} alt={currentUser?.username} size="sm" />
      <div className="flex-1">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Add a comment..."
          className="w-full bg-transparent border-b border-[#2e2e2e] focus:border-[#6c63ff] pb-1 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200"
        />

        {focused && (
          <div className="flex justify-end gap-2 mt-3">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              loading={loading}
              onClick={handleSubmit}
              disabled={!content.trim()}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
