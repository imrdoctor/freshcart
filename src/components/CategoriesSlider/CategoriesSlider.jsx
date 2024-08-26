import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import styles from "./CategoriesSlider.module.css";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Loader/Loader";

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5, // عرض عنصرين في الشاشة الكبيرة
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1024, // للشاشات الكبيرة
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768, // للشاشات المتوسطة
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480, // للشاشات الصغيرة
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

// export default function CategoriesSlider() {
//   const [categories, setCategories] = useState([]);

//   function getCategories() {
//     axios
//       .get("https://ecommerce.routemisr.com/api/v1/categories")
//       .then(({ data }) => {
//         setCategories(data.data);
//         console.log(data.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   useEffect(() => {
//     getCategories();
//   }, []);

export default function CategoriesSlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["catagoryslider"],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });



  // Display Loader
  if (isLoading) {
    return <Loader />;
  };
  // Display Error
  if (isError) return <div>Error: {error.message}</div>;

  // Display Date
  return (
    <div className="container mx-auto overflow-hidden my-16">
      <h2 className="px-3 font-bold">Shop Popular Categories</h2>
      <Slider {...settings}>
        {data?.data.data.map((category) => (
          <div className="text-center" key={category._id}>
            <img
              className="w-full h-64 object-cover p-2 "
              src={category.image}
              alt={category.name}
            />
            <h3>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
