import React, { useState } from "react";
import axios from "axios";

export default function UploadPost() {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select an image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axios.post(
        "https://ai-imagecaptiongenerator.onrender.com/api/posts",
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setCaption(res.data.post.caption);
    } catch (err) {
      console.error(err);
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">📸 Image Caption Generator</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-blue-50 file:text-blue-700
                       hover:file:bg-blue-100"
          />
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating Caption..." : "Generate Caption"}
          </button>
        </form>

        {caption && (
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h2 className="font-semibold text-green-700">Generated Caption:</h2>
            <p className="text-gray-800 mt-1">{caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
