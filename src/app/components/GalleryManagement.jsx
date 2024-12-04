// GalleryManagement.jsx


import { useState, useEffect } from "react";

function GalleryManagement() {
  const [images, setImages] = useState([]); // State for storing images
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchImages();
  }, []);

  // Fetch images from API
  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gallery");
      if (!res.ok) throw new Error("Failed to fetch images");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload image");
      alert("Image uploaded successfully!");
      fetchImages(); // Refresh the gallery
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle image deletion
  const handleDelete = async (id) => {
    if (!id) {
      console.error("No ID provided for deletion.");
      return;
    }

    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
      const res = await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete image");

      alert("Image deleted successfully!");
      fetchImages(); // Correctly call fetchImages here
    } catch (err) {
      console.error("Error deleting image:", err.message);
    }
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Gallery Management</h2>

      {/* Upload Image */}
      <input
        type="file"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-900 border rounded cursor-pointer"
        aria-label="Upload Image"
      />

      {/* Loading and Error States */}
      {loading && <p className="mt-6">Loading images...</p>}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* Gallery Grid */}
      {!loading && !error && (
        <div className="mt-6 grid grid-cols-6 gap-4">
          {images.map((image) => (
            <div key={image._id} className="relative group">
              <img
                src={image.url}
                alt={image.alt || "Gallery Image"}
                className="w-20 h-20 object-cover rounded shadow-md"
              />
              {/* Delete Button */}
              <button
                        className="absolute inset-x-0 bottom-0 bg-red-600 text-white text-sm py-1 rounded-b opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDelete(image._id.toString())}
                     >
                        Delete
                     </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default GalleryManagement;



