import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { videoService } from "../../services/videoService";
import toast from "react-hot-toast";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Upload = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setForm] = useState({ title: "", description: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      toast.error("Please login to upload videos");
      navigate("/login");
      return;
    }
    if (!videoFile) {
      toast.error("Please select a video file");
      return;
    }
    if (!thumbnail) {
      toast.error("Please select a thumbnail");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);

      const res = await videoService.uploadVideo(formData, (percent) => {
        setProgress(percent);
      });

      toast.success("Video uploaded successfully!");
      navigate(`/watch/${res?.data?.publishVideo?._id || res?.data?._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div style={{ maxWidth: "720px", margin: "0 auto", padding: "24px" }}>
      {/* Header */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            color: "#f1f1f1",
            fontSize: "24px",
            fontWeight: 700,
            marginBottom: "4px",
          }}
        >
          Upload Video
        </h1>
        <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
          Share your content with the world
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "24px" }}
      >
        {/* Video File Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ color: "#aaaaaa", fontSize: "14px" }}>
            Video File <span style={{ color: "#ff4444" }}>*</span>
          </label>
          <label
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "180px",
              border: `2px dashed ${videoFile ? "#3ea6ff" : "#3d3d3d"}`,
              borderRadius: "12px",
              cursor: "pointer",
              backgroundColor: videoFile ? "rgba(62,166,255,0.05)" : "#1a1a1a",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!videoFile) e.currentTarget.style.borderColor = "#f1f1f1";
            }}
            onMouseLeave={(e) => {
              if (!videoFile) e.currentTarget.style.borderColor = "#3d3d3d";
            }}
          >
            <input
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            {videoFile ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <MdOutlineVideoLibrary size={40} color="#3ea6ff" />
                <p
                  style={{
                    color: "#f1f1f1",
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {videoFile.name}
                </p>
                <p style={{ color: "#aaaaaa", fontSize: "12px" }}>
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
                <p style={{ color: "#3ea6ff", fontSize: "12px" }}>
                  Click to change file
                </p>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <AiOutlineCloudUpload size={40} color="#717171" />
                <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
                  Click to select a video file
                </p>
                <p style={{ color: "#717171", fontSize: "12px" }}>
                  MP4, MOV, AVI, MKV supported
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Thumbnail Upload */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ color: "#aaaaaa", fontSize: "14px" }}>
            Thumbnail <span style={{ color: "#ff4444" }}>*</span>
          </label>
          <label
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "180px",
              border: `2px dashed ${thumbnail ? "#3ea6ff" : "#3d3d3d"}`,
              borderRadius: "12px",
              cursor: "pointer",
              overflow: "hidden",
              backgroundColor: "#1a1a1a",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (!thumbnail) e.currentTarget.style.borderColor = "#f1f1f1";
            }}
            onMouseLeave={(e) => {
              if (!thumbnail) e.currentTarget.style.borderColor = "#3d3d3d";
            }}
          >
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleThumbnail}
            />
            {thumbnailPreview ? (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
                >
                  <p
                    style={{
                      color: "#f1f1f1",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    Change thumbnail
                  </p>
                </div>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <BsImageFill size={32} color="#717171" />
                <p style={{ color: "#aaaaaa", fontSize: "14px" }}>
                  Click to select thumbnail
                </p>
                <p style={{ color: "#717171", fontSize: "12px" }}>
                  JPG, PNG, WebP supported
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Title */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ color: "#aaaaaa", fontSize: "14px" }}>
            Title <span style={{ color: "#ff4444" }}>*</span>
          </label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter video title"
            required
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #3d3d3d",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#f1f1f1",
              fontSize: "14px",
              outline: "none",
              fontFamily: "Roboto, sans-serif",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f1f1f1")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
        </div>

        {/* Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ color: "#aaaaaa", fontSize: "14px" }}>
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell viewers about your video..."
            rows={4}
            style={{
              backgroundColor: "#1a1a1a",
              border: "1px solid #3d3d3d",
              borderRadius: "8px",
              padding: "12px 16px",
              color: "#f1f1f1",
              fontSize: "14px",
              outline: "none",
              fontFamily: "Roboto, sans-serif",
              resize: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#f1f1f1")}
            onBlur={(e) => (e.target.style.borderColor = "#3d3d3d")}
          />
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#aaaaaa", fontSize: "13px" }}>
                Uploading to Cloudinary...
              </span>
              <span
                style={{ color: "#f1f1f1", fontSize: "13px", fontWeight: 600 }}
              >
                {progress}%
              </span>
            </div>
            <div
              style={{
                width: "100%",
                backgroundColor: "#272727",
                borderRadius: "999px",
                height: "6px",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  backgroundColor: "#3ea6ff",
                  height: "6px",
                  borderRadius: "999px",
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ display: "flex", gap: "12px", paddingTop: "8px" }}>
          <button
            type="submit"
            disabled={uploading}
            style={{
              flex: 1,
              padding: "12px 24px",
              backgroundColor: uploading ? "#3d3d3d" : "#f1f1f1",
              color: uploading ? "#717171" : "#0f0f0f",
              borderRadius: "20px",
              border: "none",
              cursor: uploading ? "not-allowed" : "pointer",
              fontSize: "15px",
              fontWeight: 700,
              fontFamily: "Roboto, sans-serif",
              transition: "all 0.2s",
            }}
          >
            {uploading ? `Uploading ${progress}%...` : "Upload Video"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={uploading}
            style={{
              padding: "12px 24px",
              backgroundColor: "#272727",
              color: "#f1f1f1",
              borderRadius: "20px",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              fontFamily: "Roboto, sans-serif",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#3d3d3d")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#272727")
            }
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
