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
      setCaption(""); // Clear caption when a new image is selected
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gray-900 p-4 text-white">
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
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
          }
          50% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
          }
          75% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
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

      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-gray-800 bg-opacity-70 backdrop-blur-md shadow-2xl transition-transform duration-300 hover:scale-[1.01] border border-gray-700">
        <div className="p-8">
          <h2 className="mb-6 text-center text-4xl font-extrabold text-white">
            Create Post ✨
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center justify-center">
              <label
                htmlFor="file-upload"
                className={`flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ease-in-out ${
                  preview
                    ? "border-purple-400 bg-purple-900 bg-opacity-20"
                    : "border-gray-600 hover:border-purple-500 hover:bg-gray-700 hover:text-purple-400"
                }`}
              >
                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      alt="preview"
                      className="max-h-60 rounded-lg object-cover shadow-lg transition-transform duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black bg-opacity-60 text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <span className="text-sm font-semibold">
                        Change image
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mb-4 h-12 w-12 text-gray-400 transition-colors duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v9"
                      />
                    </svg>
                    <span className="text-md font-medium text-gray-400">
                      Drag and drop an image or click to upload
                    </span>
                  </>
                )}
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !image}
              className={`flex w-full items-center justify-center rounded-xl p-3 font-semibold transition-all duration-300 transform active:scale-95 ${
                loading || !image
                  ? "cursor-not-allowed bg-gray-600 text-gray-400"
                  : "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg hover:from-purple-600 hover:to-blue-600"
              }`}
            >
              {loading ? (
                <>
                  <svg
                    className="mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Caption...
                </>
              ) : (
                "Generate Caption"
              )}
            </button>
          </form>

          {caption && (
            <div className="mt-8 rounded-xl bg-gray-700 bg-opacity-50 p-6 shadow-inner border border-gray-600 transition-all duration-300">
              <h3 className="mb-2 text-lg font-bold text-gray-200">
                Generated Caption:
              </h3>
              <p className="text-gray-300">{caption}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}