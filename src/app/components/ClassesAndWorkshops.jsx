// ClassesAndWorkshops.jsx
import { useState } from 'react';

function ClassesAndWorkshops() {
  const [classes, setClasses] = useState([
    { id: 1, title: 'Yoga Class', duration: '1 Hour', description: 'Relaxing yoga session', image: 'path/to/image2.jpg' },
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
    // Logic to add or update class details, including image handling
  };

  const handleDelete = (id) => {
    setClasses(classes.filter(classItem => classItem.id !== id));
  };

  return (
    <section className="text-gray-400 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Classes & Workshops</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" type="text" placeholder="Class Title" />
        <textarea className="w-full p-2 border rounded" placeholder="Description"></textarea>
        <input className="w-full p-2 border rounded" type="text" placeholder="Duration" />
        
        <input type="file" onChange={handleImageUpload} className="block w-full text-sm text-gray-900 border rounded cursor-pointer" />
        {image && <img src={image} alt="Class Preview" className="w-full h-32 object-cover mt-4 rounded" />}

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add/Update Class</button>
      </form>

      <ul className="mt-6 space-y-4">
        {classes.map(classItem => (
          <li key={classItem.id} className="p-4 border rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{classItem.title}</p>
              <p className="text-sm">{classItem.duration}</p>
              <p className="text-sm">{classItem.description}</p>
              {classItem.image && <img src={classItem.image} alt="Class" className="w-20 h-20 object-cover mt-2 rounded" />}
            </div>
            <div>
              <button className="text-yellow-500">Edit</button>
              <button className="text-red-500 ml-4" onClick={() => handleDelete(classItem.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClassesAndWorkshops;

