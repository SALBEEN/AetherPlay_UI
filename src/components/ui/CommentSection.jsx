import useComments from "../../hooks/useComments";
import CommentBox from "./CommentBox";
import CommentItem from "./CommentItem";
import Skeleton from "../common/Skeleton";

const CommentSection = ({ videoId }) => {
  const { comments, loading, error, addComment, deleteComment } =
    useComments(videoId);

  const safeComments = Array.isArray(comments) ? comments : [];

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Header */}
      <h3
        style={{
          color: "#f1f1f1",
          fontSize: "16px",
          fontWeight: 600,
          marginBottom: "24px",
        }}
      >
        {loading ? "Comments" : `${safeComments.length} Comments`}
      </h3>

      {/* Add Comment */}
      <div style={{ marginBottom: "32px" }}>
        <CommentBox onAdd={addComment} />
      </div>

      {/* Comments List */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "12px" }}>
                <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))
        ) : error ? (
          <p style={{ color: "#aaaaaa", fontSize: "14px" }}>{error}</p>
        ) : safeComments.length === 0 ? (
          <div style={{ textAlign: "center", paddingTop: "40px" }}>
            <p style={{ fontSize: "32px", marginBottom: "8px" }}>💬</p>
            <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
              No comments yet. Be the first!
            </p>
          </div>
        ) : (
          safeComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDelete={deleteComment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;
