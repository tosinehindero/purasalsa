import { useState, useEffect } from "react";

function EventsAndPerformances() {
  const [events, setEvents] = useState([]); // State for storing events
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });
  const [image, setImage] = useState(null); // State for image upload
  const [previewImage, setPreviewImage] = useState(null); // Preview uploaded image
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from API
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the file for upload
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  // Handle form submission to add/update event
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("title", formData.title);
    formDataObj.append("date", formData.date);
    formDataObj.append("location", formData.location);
    formDataObj.append("description", formData.description);
    if (image) formDataObj.append("image", image);

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        body: formDataObj,
      });

      if (!res.ok) throw new Error("Failed to add/update event");
      alert("Event added/updated successfully!");
      fetchEvents(); // Refresh the list of events
      setFormData({ title: "", date: "", location: "", description: "" }); // Clear the form
      setImage(null);
      setPreviewImage(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // Handle deleting an event
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch("/api/events", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete event");
      alert("Event deleted successfully!");
      fetchEvents(); // Refresh the list of events
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <section className="text-gray-800 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Events & Performances</h2>

      {/* Form to add/update events */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Event Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          aria-label="Event Title"
        />
        <input
          className="w-full p-2 border rounded"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          required
          aria-label="Event Date"
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          aria-label="Event Location"
        />
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          aria-label="Event Description"
        ></textarea>

        <input
          type="file"
          onChange={handleImageUpload}
          className="block w-full text-sm text-gray-900 border rounded cursor-pointer"
          aria-label="Upload Event Image"
        />
        {previewImage && (
          <img
            src={previewImage}
            alt="Event Preview"
            className="w-full h-32 object-cover mt-4 rounded"
          />
        )}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add/Update Event
        </button>
      </form>

      {/* Loading State */}
      {loading && <p className="mt-6">Loading events...</p>}

      {/* Error State */}
      {error && <p className="mt-6 text-red-500">{error}</p>}

      {/* List of events */}
      {!loading && !error && (
        <ul className="mt-6 space-y-4">
          {events.map((event) => (
            <li
              key={event._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{event.title}</p>
                <p className="text-sm">
                  {event.date} | {event.location}
                </p>
                <p className="text-sm">{event.description}</p>
                {event.image && (
                  <img
                    src={event.image}
                    alt="Event"
                    className="w-20 h-20 object-cover mt-2 rounded"
                  />
                )}
              </div>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default EventsAndPerformances;
