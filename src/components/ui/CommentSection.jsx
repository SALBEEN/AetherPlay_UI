import useComments from "../../hooks/useComments";
import CommentBox from "./CommentBox";
import CommentItem from "./CommentItem";
import Skeleton from "../common/Skeleton";

const CommentSection = ({ videoId }) => {
  const { comments, loading, error, addComment, deleteComment } =
    useComments(videoId);

  return (
    <div className="mt-6">
      {/* Header */}
      <h3 className="text-white font-medium text-lg mb-6">
        {loading ? "Comments" : `${comments.length} Comments`}
      </h3>

      {/* Add Comment */}
      <div className="mb-8">
        <CommentBox onAdd={addComment} />
      </div>

      {/* Comments List */}
      <div className="flex flex-col gap-6">
        {loading ? (
          Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="w-7 h-7 rounded-full shrink-0" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton className="h-3 w-1/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </div>
            ))
        ) : error ? (
          <p className="text-[#aaaaaa] text-sm">{error}</p>
        ) : comments.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-2xl mb-2">💬</p>
            <p className="text-[#aaaaaa] text-sm">
              No comments yet. Be the first!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
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
