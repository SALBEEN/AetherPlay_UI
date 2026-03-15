import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { videoService } from "../../services/videoService";
import Button from "../../components/common/Button";
import toast from "react-hot-toast";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Upload = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });
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
      navigate(`/watch/${res?.data?._id}`);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Upload failed");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Upload Video</h1>
        <p className="text-[#aaaaaa] text-sm mt-1">
          Share your content with the world
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Video File Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#aaaaaa]">
            Video File <span className="text-red-400">*</span>
          </label>
          <label
            className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-colors duration-200
            ${
              videoFile
                ? "border-[#6c63ff] bg-[#6c63ff]/10"
                : "border-[#2e2e2e] hover:border-[#6c63ff] bg-[#1a1a1a] hover:bg-[#1a1a1a]"
            }`}
          >
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => setVideoFile(e.target.files[0])}
            />
            {videoFile ? (
              <div className="flex flex-col items-center gap-2">
                <MdOutlineVideoLibrary className="text-[#6c63ff] text-4xl" />
                <p className="text-white text-sm font-medium">
                  {videoFile.name}
                </p>
                <p className="text-[#aaaaaa] text-xs">
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <AiOutlineCloudUpload className="text-[#717171] text-4xl" />
                <p className="text-[#aaaaaa] text-sm">
                  Click to select a video file
                </p>
                <p className="text-[#717171] text-xs">
                  MP4, MOV, AVI supported
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Thumbnail Upload */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#aaaaaa]">
            Thumbnail <span className="text-red-400">*</span>
          </label>
          <label
            className={`relative flex items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer overflow-hidden transition-colors duration-200
            ${
              thumbnail
                ? "border-[#6c63ff]"
                : "border-[#2e2e2e] hover:border-[#6c63ff] bg-[#1a1a1a]"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleThumbnail}
            />
            {thumbnailPreview ? (
              <>
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <p className="text-white text-sm">Change thumbnail</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <BsImageFill className="text-[#717171] text-3xl" />
                <p className="text-[#aaaaaa] text-sm">
                  Click to select thumbnail
                </p>
                <p className="text-[#717171] text-xs">
                  JPG, PNG, WebP supported
                </p>
              </div>
            )}
          </label>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#aaaaaa]">
            Title <span className="text-red-400">*</span>
          </label>
          <input
            name="title"
            type="text"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter video title"
            required
            className="bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#6c63ff] rounded-lg px-4 py-3 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm text-[#aaaaaa]">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Tell viewers about your video..."
            rows={4}
            className="bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#6c63ff] rounded-lg px-4 py-3 text-sm text-white placeholder-[#717171] outline-none transition-colors duration-200 resize-none"
          />
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-xs text-[#aaaaaa]">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-[#272727] rounded-full h-2">
              <div
                className="bg-[#6c63ff] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            loading={uploading}
            disabled={uploading}
            className="flex-1"
          >
            {uploading ? `Uploading ${progress}%` : "Upload Video"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/")}
            disabled={uploading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
