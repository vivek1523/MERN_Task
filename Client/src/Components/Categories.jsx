import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://mern-task-backend-6cuc.onrender.com')
      .then(response => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
        setError('Failed to load categories.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="categories">
      {categories.length ? (
        categories.map(category => (
          <div key={category._id} className="category">
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default Categories;
