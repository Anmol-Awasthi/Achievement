import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ addAchievement }) => {
  const navigate = useNavigate();

   // State for form data
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    file: null,
    fileUrl: ''
  });

    // State for form validation errors
  const [errors, setErrors] = useState({});

  
  // State for persisted form data from localStorage
  const [formDataFromStorage, setFormDataFromStorage] = useState(() => {
    const storedData = localStorage.getItem('achievementFormData');
    return storedData ? JSON.parse(storedData) : {};
  });

   // Update form state with persisted data when it changes
  useEffect(() => {
    if (Object.keys(formDataFromStorage).length > 0) {
      setForm(formDataFromStorage);
    }
  }, [formDataFromStorage]);

  // Handle changes in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
    localStorage.setItem('achievementFormData', JSON.stringify({ ...form, [name]: value }));
  };

    // Handle changes in file input field
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setForm({
      ...form,
      file,
      fileUrl
    });
    localStorage.setItem('achievementFormData', JSON.stringify({ ...form, file, fileUrl }));
  };
  
  // Validate form data
  const validate = () => {
    const tempErrors = {};
    if (!form.title) tempErrors.title = 'Title is required';
    if (!form.description) tempErrors.description = 'Description is required';
    if (!form.category) tempErrors.category = 'Category is required';
    if (!form.date) tempErrors.date = 'Date is required';
    // if (!form.file) tempErrors.file = 'A media file is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

   // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addAchievement(form);
      setForm({
        title: '',
        description: '',
        category: '',
        date: '',
        file: null,
        fileUrl: ''
      });
      navigate('/achievements');
      localStorage.removeItem('achievementFormData');
    }
  };

    // Get current date for max date input
  const today = new Date().toISOString().split('T')[0];

   // Render form
  return (
    <div className="bg-gray-900 text-gray-300 mt-6 mb-6 md:mt-4 md:mb-4 flex items-center justify-center px-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold text-white mb-6">Add Achievement</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            >
              <option value="">Select a category</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="date">Date Achieved</label>
            <label htmlFor="date" className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none cursor-pointer block">
              <input
                type="date"
                id="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-transparent focus:outline-none cursor-pointer"
                max={today}
              />
            </label>
            {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 mb-2" htmlFor="file">Upload Media</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
            {errors.file && <p className="text-red-500 text-sm">{errors.file}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
