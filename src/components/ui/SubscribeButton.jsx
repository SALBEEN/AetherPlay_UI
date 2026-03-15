import { useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import axiosInstance from "../../api/axiosInstance";

const SubscribeButton = ({ channelId, initialSubscribed = false }) => {
  const [subscribed, setSubscribed] = useState(initialSubscribed);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please login to subscribe");
      return;
    }
    try {
      setLoading(true);
      await axiosInstance.post(`/subscriptions/c/${channelId}`);
      setSubscribed((prev) => !prev);
      toast.success(subscribed ? "Unsubscribed" : "Subscribed!");
    } catch {
      toast.error("Failed to update subscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className={clsx(
        "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200",
        subscribed
          ? "bg-[#272727] text-[#aaaaaa] hover:bg-[#3f3f3f]"
          : "bg-white text-black hover:bg-gray-200",
      )}
    >
      {loading ? "..." : subscribed ? "Subscribed" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
