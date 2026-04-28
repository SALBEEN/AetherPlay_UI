import { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ src, onPlay, onPause, onEnded }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  useEffect(() => {
    if (!src || !videoRef.current) return;

    const video = videoRef.current;
    const isHLS = src.includes(".m3u8") || src.includes("m3u8");

    if (isHLS) {
      if (Hls.isSupported()) {
        // Destroy previous instance
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });

        hlsRef.current = hls;
        hls.loadSource(src);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          console.log("HLS manifest parsed — ready to play");
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error("HLS error:", data);
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                hls.recoverMediaError();
                break;
              default:
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari native HLS support
        video.src = src;
      } else {
        console.error("HLS not supported in this browser");
      }
    } else {
      // Regular MP4/WebM
      video.src = src;
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay={false}
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000",
        display: "block",
      }}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      onError={(e) => console.error("Video error:", e)}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
