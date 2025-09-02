import { useState } from "react";
import api from "../api/axios";

export default function CreatePost() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setCaption("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please upload an image to generate a caption.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      const res = await api.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setCaption(res.data.post.caption);
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#02022e] via-[#0a0a3f] to-black p-4 text-white">
      {/* Background animation elements */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-400 opacity-20 animate-bg-dots"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 5 + 1}px`,
              height: `${Math.random() * 5 + 1}px`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 15 + 10}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes bg-dots {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          50% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          75% {
            transform: translate(
              ${Math.random() * 200 - 100}px,
              ${Math.random() * 200 - 100}px
            );
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-bg-dots {
          animation-name: bg-dots;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>

      {/* Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border-[#bab2f4] border-2 bg-gradient-to-br from-black via-[#0a0a3f] to-[#02022e] bg-opacity-70 backdrop-blur-md p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-4xl font-extrabold text-white">
          Create Post ✨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="relative flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center hover:border-purple-500 hover:bg-gray-700 overflow-hidden">
            {preview ? (
              <div className="relative w-full flex justify-center">
                <img
                  src={preview}
                  alt="preview"
                  className="max-h-60 rounded-lg object-contain"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#040421]/80 bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <span className="text-white font-semibold">Change Image</span>
                </div>
              </div>
            ) : (
              <span>Click to upload an image</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </label>

          <button
            type="submit"
            disabled={loading || !image}
            className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 p-3 font-semibold text-white hover:from-purple-600 hover:to-blue-600 disabled:opacity-50"
          >
            {loading ? "Generating Caption..." : "Generate Caption"}
          </button>
        </form>

        {caption && (
          <div className="mt-6 rounded-xl bg-gray-700 bg-opacity-50 p-6">
            <h3 className="mb-2 text-lg font-bold text-gray-200">
              Generated Caption:
            </h3>
            <p className="text-gray-300">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
