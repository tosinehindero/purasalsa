// GalleryManagement.jsx
import { useState } from 'react';

function GalleryManagement() {
  const [images, setImages] = useState([
    { id: 1, url: 'path/to/image1.jpg' },
    { id: 2, url: 'path/to/image2.jpg' },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = { id: Date.now(), url: URL.createObjectURL(file) };
      setImages([...images, newImage]);
    }
  };

  const handleDelete = (id) => {
    setImages(images.filter(image => image.id !== id));
  };

  return (
    <section className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Gallery Management</h2>

      <input
        type="file"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-900 border rounded cursor-pointer"
      />

      <div className="mt-6 grid grid-cols-6 gap-2"> {/* Adjusted grid for smaller thumbnails */}
        {images.map(image => (
          <div key={image.id} className="relative">
            <img src={image.url} alt="Gallery" className="w-20 h-20 object-cover rounded" /> {/* Thumbnail size */}
            <button className="absolute top-1 right-1 text-red-500" onClick={() => handleDelete(image.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default GalleryManagement;


