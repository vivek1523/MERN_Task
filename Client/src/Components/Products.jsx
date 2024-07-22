import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://mern-task-backend-6cuc.onrender.com/api/products')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="products">
      {products.length ? (
        products.map(product => (
          <div key={product._id} className="product">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default Products;
