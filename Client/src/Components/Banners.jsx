import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Banners = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/banners')
      .then(response => {
        setBanners(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching banners:', error);
        setError('Failed to load banners.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading banners...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="banners">
      {banners.length ? (
        banners.map(banner => (
          <div key={banner._id} className="banner">
            <img src={banner.image} alt={banner.text} />
            <p>{banner.text}</p>
            <a href={banner.link}>Learn more</a>
          </div>
        ))
      ) : (
        <p>No banners available.</p>
      )}
    </div>
  );
};

export default Banners;
