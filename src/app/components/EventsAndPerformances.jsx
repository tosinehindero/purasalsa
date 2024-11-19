// EventsAndPerformances.jsx
import { useState } from 'react';

function EventsAndPerformances() {
  const [events, setEvents] = useState([
    { id: 1, title: 'Concert', date: '2024-12-25', location: 'Downtown Hall', description: 'Christmas concert', image: 'path/to/image1.jpg' },
  ]);
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      // Here, you would also handle file data to store it in your database or backend
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to add or update event details, including image handling
  };

  const handleDelete = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <section className="text-gray-400 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Events & Performances</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Event Title" />
        <input className="w-full p-2 border rounded" type="date" placeholder="Event Date" />
        <input className="w-full p-2 border rounded" type="text" placeholder="Location" />
        <textarea className="w-full p-2 border rounded" placeholder="Description"></textarea>
        
        <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-900 border rounded cursor-pointer" />
        {image && <img src={image} alt="Event Preview" className="w-full h-32 object-cover mt-4 rounded" />}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add/Update Event</button>
      </form>

      <ul className="mt-6 space-y-4">
        {events.map(event => (
          <li key={event.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{event.title}</p>
              <p className="text-sm">{event.date} | {event.location}</p>
              <p className="text-sm">{event.description}</p>
              {event.image && <img src={event.image} alt="Event" className="w-20 h-20 object-cover mt-2 rounded" />}
            </div>
            <div>
              <button className="text-yellow-500">Edit</button>
              <button className="text-red-500 ml-4" onClick={() => handleDelete(event.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default EventsAndPerformances;


