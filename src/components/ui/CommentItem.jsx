import { useState } from "react";
import { format } from "timeago.js";
import toast from "react-hot-toast";

const CommentItem = ({ comment, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isOwner = currentUser?._id === comment?.owner?._id;

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await onDelete(comment._id);
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setDeleting(false);
    }
  };

  const ownerName =
    comment?.owner?.username || comment?.owner?.fullName || "User";
  const ownerAvatar = comment?.owner?.avatar;

  return (
    <div style={{ display: "flex", gap: "12px" }} className="group">
      {/* Avatar */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          backgroundColor: "#3d3d3d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {ownerAvatar ? (
          <img
            src={ownerAvatar}
            alt={ownerName}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#fff", fontSize: "13px", fontWeight: 600 }}>
            {ownerName?.charAt(0)?.toUpperCase()}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "4px",
          }}
        >
          <span style={{ color: "#f1f1f1", fontSize: "13px", fontWeight: 500 }}>
            {ownerName}
          </span>
          <span style={{ color: "#717171", fontSize: "12px" }}>
            {format(comment?.createdAt)}
          </span>
        </div>
        <p style={{ color: "#f1f1f1", fontSize: "14px", lineHeight: "20px" }}>
          {comment?.content}
        </p>
      </div>

      {/* Delete */}
      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#717171",
            padding: "4px",
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.15s",
            display: "flex",
            alignItems: "center",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.color = "#ff4444";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "0";
            e.currentTarget.style.color = "#717171";
          }}
        >
          🗑
        </button>
      )}
    </div>
  );
};

export default CommentItem;
