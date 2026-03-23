import { useState } from "react";
import { format } from "timeago.js";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";

const CommentItem = ({ comment, onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isOwner =
    currentUser?._id === comment?.owner?._id ||
    currentUser?.username === comment?.owner?.username;

  const ownerName =
    comment?.owner?.username || comment?.owner?.fullName || "User";
  const ownerAvatar = comment?.owner?.avatar;

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

  return (
    <div
      style={{ display: "flex", gap: "12px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
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
            flexWrap: "wrap",
          }}
        >
          <span style={{ color: "#f1f1f1", fontSize: "13px", fontWeight: 500 }}>
            @{ownerName}
          </span>
          <span style={{ color: "#717171", fontSize: "12px" }}>
            {format(comment?.createdAt)}
          </span>
        </div>
        <p
          style={{
            color: "#f1f1f1",
            fontSize: "14px",
            lineHeight: "20px",
            wordBreak: "break-word",
          }}
        >
          {comment?.content}
        </p>
      </div>

      {/* Delete button */}
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
            display: "flex",
            alignItems: "center",
            opacity: hovered ? 1 : 0,
            transition: "all 0.15s",
            flexShrink: 0,
            alignSelf: "flex-start",
            marginTop: "2px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#717171")}
          title="Delete comment"
        >
          {deleting ? "..." : <MdDeleteOutline size={18} />}
        </button>
      )}
    </div>
  );
};

export default CommentItem;
