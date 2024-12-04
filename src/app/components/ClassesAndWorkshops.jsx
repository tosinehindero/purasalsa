// ClassesAndWorkshops.jsx form
import { useState, useEffect } from "react";

function ClassesAndWorkshops() {
  const [classes, setClasses] = useState([]);
  const [formData, setFormData] = useState({ title: "", description: "", duration: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const res = await fetch("/api/classes");
    const data = await res.json();
    setClasses(data);
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("description", formData.description);
    formDataObj.append("duration", formData.duration);
    formDataObj.append("image", image);

    const res = await fetch("/api/classes", {
      method: "POST",
      body: formDataObj,
    });

    if (res.ok) {
      fetchClasses(); // Refresh class list
    }
  };

  const handleDelete = async (id) => {
    await fetch("/api/classes", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    fetchClasses(); // Refresh class list
  };

  return (
    <section className="text-gray-400 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Classes & Workshops</h2>

      {/* Add Class Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Class Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
        />
        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border rounded cursor-pointer"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Class
        </button>
      </form>

      {/* Display Classes */}
      <ul className="mt-6 space-y-4">
        {classes.map((classItem) => (
          <li
            key={classItem._id}
            className="p-4 border rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{classItem.title}</p>
              <p className="text-sm">{classItem.duration}</p>
              <p className="text-sm">{classItem.description}</p>
              {classItem.image && (
                <img
                  src={classItem.image}
                  alt="Class"
                  className="w-20 h-20 object-cover mt-2 rounded"
                />
              )}
            </div>
            <button
              className="text-red-500 ml-4"
              onClick={() => handleDelete(classItem._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClassesAndWorkshops;
