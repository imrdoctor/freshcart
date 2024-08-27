import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from '../Loader/Loader';
import './Brands.module.css';

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [loading, setLoading] = useState(false);

  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['allbrands'],
    queryFn: getBrands,
    retry: Infinity,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 text-2xl mt-10">
        <p>Something went wrong: {error.message}</p>
      </div>
    );
  }

  const handleBrandClick = (brand) => {
    setLoading(true);
    setSelectedBrand(brand);
    setTimeout(() => setLoading(false), 500); // Simulate loading delay
  };

  const handleClosePopup = (e) => {
    if (e.target.id === 'popup-overlay') {
      setSelectedBrand(null);
    }
  };

  return (
    <div className="p-4 mt-8">
      <h1 className="text-4xl text-green-500 font-semibold mb-4 text-center pt-16">All Brands</h1>
      <p className="text-lg text-gray-500 mb-4 text-center">We have a wide variety of brands to choose from</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.data?.data.map((brand) => (
          <div
            key={brand._id}
            className="p-4 rounded border-4 hover:border-green-400 hover:bg-green-50 duration-300 cursor-pointer"
            onClick={() => handleBrandClick(brand)}
          >
            <img src={brand.image} alt={brand.name} className="w-full h-40 object-cover mb-4" />
            <h2 className="text-2xl text-center text-gray-600 font-semibold mb-2">{brand.name}</h2>
          </div>
        ))}
      </div>

      {/* Display popup */}
      {selectedBrand && (
        <div
          id="popup-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleClosePopup}
        >
          <div className="bg-white p-6 rounded shadow-lg relative max-w-md w-full animate-slide-down">
            {loading && <Loader />} {/* Display loader while loading */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedBrand(null)}
            >
              &times;
            </button>
            <h2 className="text-3xl text-green-500 font-semibold">{selectedBrand.name}</h2>
            <p className="text-gray-500 mb-4">{selectedBrand.slug}</p>
            <img src={selectedBrand.image} alt={selectedBrand.name} className="w-full h-40 object-cover mb-4" />
            <button
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
              onClick={() => setSelectedBrand(null)}
            >
              Close
            </button> 
          </div>
        </div>
      )}
    </div>
  );
}
