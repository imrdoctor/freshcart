import React from 'react';
import sliderImg1 from '../../assets/images/slider-image-1.jpeg';
import sliderImg2 from '../../assets/images/slider-image-2.jpeg';
import Mslider1 from '../../assets/images/slider-image-3.jpeg';
import Mslider2 from '../../assets/images/blog-img-2.jpeg';
import Mslider3 from '../../assets/images/blog-img-1.jpeg';
import Slider from "react-slick";

export default function MianSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="flex flex-col md:flex-row mt-28 overflow-hidden">
      <div className="w-full md:w-3/4 mb-8">
        <Slider {...settings}>
          <img className='w-full h-[400px] object-cover ' src={Mslider1} alt="Slider Image 3" />
          <img className='w-full h-[400px] object-cover' src={Mslider2} alt="Slider Image 2" />
          <img className='w-full h-[400px] object-cover' src={Mslider3} alt="Slider Image 2" />

        </Slider>
      </div>
      <div className="w-full md:w-1/4 flex flex-col md:flex-row md:flex-col  mt-2 md:mt-0">
        <img className='w-full h-[200px] object-cover' src={sliderImg2} alt="Slider Image 2" />
        <img className='w-full h-[200px] object-cover' src={sliderImg1} alt="Slider Image 1" />
      </div>
    </div>
  );
}
