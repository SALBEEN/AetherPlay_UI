import { useState, useRef } from "react";
import toast from "react-hot-toast";

const CommentBox = ({ onAdd }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

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
    } catch {
      toast.error("Failed to add comment");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "Escape") {
      setContent("");
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      {/* Avatar */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#3d3d3d",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>
            {currentUser?.username?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}
      </div>

      {/* Input */}
      <div style={{ flex: 1 }}>
        <input
          ref={inputRef}
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
          style={{
            width: "100%",
            background: "none",
            border: "none",
            borderBottom: `1px solid ${focused ? "#f1f1f1" : "#3d3d3d"}`,
            outline: "none",
            padding: "4px 0",
            color: "#f1f1f1",
            fontSize: "14px",
            fontFamily: "Roboto, sans-serif",
            transition: "border-color 0.2s",
          }}
        />

        {focused && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "8px",
              marginTop: "12px",
            }}
          >
            <button
              onClick={() => {
                setContent("");
                setFocused(false);
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
                color: "#f1f1f1",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Roboto, sans-serif",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || loading}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "none",
                cursor: content.trim() ? "pointer" : "not-allowed",
                backgroundColor: content.trim() ? "#3ea6ff" : "#272727",
                color: content.trim() ? "#0f0f0f" : "#717171",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Roboto, sans-serif",
                transition: "all 0.2s",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Posting..." : "Comment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
