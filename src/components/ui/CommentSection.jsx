import useComments from "../../hooks/useComments";
import CommentBox from "./CommentBox";
import CommentItem from "./CommentItem";
import Skeleton from "../common/Skeleton";

const CommentSection = ({ videoId }) => {
  const {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    sortBy,
    setSortBy,
    total,
  } = useComments(videoId);

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Header + Sort */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <h3 style={{ color: "#f1f1f1", fontSize: "16px", fontWeight: 600 }}>
          {total > 0 ? `${total} Comment${total !== 1 ? "s" : ""}` : "Comments"}
        </h3>

        {/* Sort Filter */}
        <div style={{ display: "flex", gap: "8px" }}>
          {[
            { label: "Top", value: "recent" },
            { label: "Newest", value: "recent" },
            { label: "Oldest", value: "old" },
          ].map((option, i) => (
            <button
              key={i}
              onClick={() => setSortBy(option.value)}
              style={{
                padding: "6px 14px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: "Roboto, sans-serif",
                backgroundColor:
                  sortBy === option.value && i < 2
                    ? "#272727"
                    : sortBy === option.value && i === 2
                      ? "#272727"
                      : "transparent",
                color: "#f1f1f1",
                transition: "background-color 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#272727")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  sortBy === option.value ? "#272727" : "transparent")
              }
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Comment */}
      <div style={{ marginBottom: "32px" }}>
        <CommentBox onAdd={addComment} />
      </div>

      {/* Comments List */}
      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} style={{ display: "flex", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#272727",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      height: "12px",
                      width: "25%",
                      backgroundColor: "#272727",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "80%",
                      backgroundColor: "#272727",
                      borderRadius: "4px",
                    }}
                  />
                  <div
                    style={{
                      height: "14px",
                      width: "60%",
                      backgroundColor: "#272727",
                      borderRadius: "4px",
                    }}
                  />
                </div>
              </div>
            ))}
        </div>
      ) : error ? (
        <p style={{ color: "#aaaaaa", fontSize: "14px" }}>{error}</p>
      ) : comments.length === 0 ? (
        <div style={{ textAlign: "center", paddingTop: "40px" }}>
          <p style={{ fontSize: "32px", marginBottom: "8px" }}>💬</p>
          <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
            No comments yet. Be the first to comment!
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onDelete={deleteComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
