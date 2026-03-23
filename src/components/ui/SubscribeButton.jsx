import { useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const SubscribeButton = ({
  channelId,
  initialSubscribed = false,
  subscriberCount = 0,
  onSubscribeChange,
}) => {
  const [subscribed, setSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(subscriberCount);

  const handleSubscribe = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to subscribe");
      return;
    }
    if (!channelId) {
      toast.error("Channel not found");
      return;
    }
    try {
      setLoading(true);

      // Optimistic update — update UI instantly
      const newSubscribed = !subscribed;
      setSubscribed(newSubscribed);
      setCount((prev) => (newSubscribed ? prev + 1 : prev - 1));

      await axiosInstance.post(`/subscriptions/c/${channelId}`);
      toast.success(newSubscribed ? "Subscribed!" : "Unsubscribed");

      // Notify parent if callback provided
      if (onSubscribeChange) {
        onSubscribeChange(newSubscribed, newSubscribed ? count + 1 : count - 1);
      }
    } catch (err) {
      // Revert on error
      setSubscribed((prev) => !prev);
      setCount((prev) => (subscribed ? prev + 1 : prev - 1));
      toast.error(
        err?.response?.data?.message || "Failed to update subscription",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <button
        onClick={handleSubscribe}
        disabled={loading}
        style={{
          padding: "8px 20px",
          borderRadius: "20px",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
          fontSize: "14px",
          fontWeight: 600,
          fontFamily: "Roboto, sans-serif",
          backgroundColor: subscribed ? "#272727" : "#f1f1f1",
          color: subscribed ? "#f1f1f1" : "#0f0f0f",
          opacity: loading ? 0.7 : 1,
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.opacity = "0.85";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = "1";
        }}
      >
        {loading ? "..." : subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
};

export default SubscribeButton;
