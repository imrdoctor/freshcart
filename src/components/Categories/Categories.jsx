import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Loader from "../Loader/Loader";

export default function Categories() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState(""); // New state for category name
  const [subcategories, setSubcategories] = useState([]);

  // Function to get categories
  const getCategories = async () => {
    const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
    return response.data;
  };

  // Function to get subcategories based on category ID
  const getSubcategories = async (categoryId) => {
    const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`);
    return response.data;
  };

  // Query for categories
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["getCategories"],
    queryFn: getCategories,
    retry: Infinity,
  });

  // Query for subcategories when a category is selected
  const { data: subcategoryData, isLoading: isSubcategoryLoading } = useQuery({
    queryKey: ["getSubcategories", selectedCategoryId],
    queryFn: () => getSubcategories(selectedCategoryId),
    enabled: !!selectedCategoryId, // Only run query if selectedCategoryId is not null
  });

  // Handle category click
  const handleCategoryClick = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName); // Set the category name
  };

  // Display Loader
  if (isLoading) {
    return <Loader />;
  }

  // Display Error
  if (isError) {
    return (
      <div className="text-center text-red-500 text-2xl pt-20">
        <p>Something went wrong</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col pt-5 overflow-hidden mt-16  ">
      <div className="lg:w-full lg:mx-4 lg:mb-0 flex-col lg:flex-row">

        <h1 className="text-4xl text-indigo-500 font-semibold mb-4 text-center pt-16">Categories</h1>
        <p className="text-lg text-gray-500 mb-4 text-center">We have a wide variety of Categories to choose from</p>


        <div className="flex flex-wrap -m-4 p-12">
          {data?.data.map((category, index) => (
            <div
              key={index}
              className="w-full sm:w-1/2 lg:w-1/3 p-4 hover:scale-x-105 hover:scale-y-105 border-transparent rounded-xl border-4 hover:border-indigo-400 hover:bg-indigo-300 cursor-pointer duration-300"
              onClick={() => handleCategoryClick(category._id, category.name)} 
            >
              <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col">
                <img
                  className="w-full h-80 object-cover object-center mb-4 rounded"
                  src={category.image}
                  alt={category.name}
                  style={{ objectFit: 'cover' }} 
                />
                <h3 className="text-lg font-bold text-gray-900 title-font text-center">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Display Subcategories */}
      {selectedCategoryId && (
  <div className="mt-8">
    <h2 className="text-2xl font-bold text-gray-900 title-font mb-4 p-12 text-center">
      <span className='text-indigo-400'>{selectedCategoryName}</span> Subcategories
    </h2>
    {isSubcategoryLoading ? (
      <Loader />
    ) : (
      <>
        {subcategoryData?.data.length < 1 ? (
          <h3 className="text-lg font-bold title-font text-center text-indigo-950">
            No Products Available
          </h3>
        ) : (
          <div className="flex flex-wrap -m-4">
            {subcategoryData.data.map((subcategory, index) => (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4 mx-auto p-6">
                <div className="bg-gray-100 rounded-lg p-4 h-full flex flex-col duration-300 hover:shadow-2xl border-transparent mx-8 border-4 hover:scale-x-105 hover:scale-y-105  border hover:border-indigo-600 hover:bg-indigo-300">
                  <h3 className="text-lg font-bold title-font text-center text-indigo-950">
                    {subcategory.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )}
  </div>
)}

    </div>
  );
}
