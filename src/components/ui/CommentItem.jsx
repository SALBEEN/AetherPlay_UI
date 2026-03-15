import { useState } from "react";
import { format } from "timeago.js";
import { MdDeleteOutline } from "react-icons/md";
import Avatar from "./Avatar";
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

  return (
    <div className="flex gap-3 group">
      <Avatar
        src={comment?.owner?.avatar}
        alt={comment?.owner?.username}
        size="sm"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-sm font-medium">
            {comment?.owner?.username || "Unknown"}
          </span>
          <span className="text-[#717171] text-xs">
            {format(comment?.createdAt)}
          </span>
        </div>
        <p className="text-[#aaaaaa] text-sm leading-relaxed">
          {comment?.content}
        </p>
      </div>

      {/* Delete button — only for comment owner */}
      {isOwner && (
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1.5 rounded-full hover:bg-[#272727] text-[#717171] hover:text-red-400 shrink-0"
        >
          <MdDeleteOutline size={18} />
        </button>
      )}
    </div>
  );
};

export default CommentItem;
