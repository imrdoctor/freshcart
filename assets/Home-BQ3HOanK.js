import{j as e,b as c}from"./index-BJfZhxjA.js";import{S as l}from"./index-D1rygK0x.js";import{u as m}from"./useQuery-Dcy7Iqgi.js";import{l as d}from"./Loader-DPb39At9.js";import{R as n}from"./RecentProducts-DsZZL3Ti.js";import"./ProductItem-C38CUdK8.js";const x="/freshcart/assets/slider-image-1-Dh9d2U6G.jpeg",f="/freshcart/assets/slider-image-2-Xt88XJy9.jpeg",g="/freshcart/assets/slider-image-3-BtMvVf4V.jpeg",p="/freshcart/assets/blog-img-2-xCpbw4l4.jpeg",u="/freshcart/assets/blog-img-1-DIJTRkhv.jpeg";function h(){var r={dots:!0,infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1,arrows:!1,autoplay:!0,autoplaySpeed:3e3};return e.jsxs("div",{className:"flex flex-col md:flex-row mt-28 overflow-hidden",children:[e.jsx("div",{className:"w-full md:w-3/4 mb-8",children:e.jsxs(l,{...r,children:[e.jsx("img",{className:"w-full h-[400px] object-cover ",src:g,alt:"Slider Image 3"}),e.jsx("img",{className:"w-full h-[400px] object-cover",src:p,alt:"Slider Image 2"}),e.jsx("img",{className:"w-full h-[400px] object-cover",src:u,alt:"Slider Image 2"})]})}),e.jsxs("div",{className:"w-full md:w-1/4 flex flex-col md:flex-row md:flex-col  mt-2 md:mt-0",children:[e.jsx("img",{className:"w-full h-[200px] object-cover",src:f,alt:"Slider Image 2"}),e.jsx("img",{className:"w-full h-[200px] object-cover",src:x,alt:"Slider Image 1"})]})]})}const j={infinite:!0,speed:500,slidesToShow:5,slidesToScroll:1,autoplay:!0,autoplaySpeed:3e3,responsive:[{breakpoint:1024,settings:{slidesToShow:4}},{breakpoint:768,settings:{slidesToShow:2}},{breakpoint:480,settings:{slidesToShow:1}}]};function w(){function r(){return c.get("https://ecommerce.routemisr.com/api/v1/categories")}const{data:i,isError:t,error:a,isLoading:o,isFetching:v}=m({queryKey:["catagoryslider"],queryFn:r,staleTime:1e3*60*10});return o?e.jsx(d,{}):t?e.jsxs("div",{children:["Error: ",a.message]}):e.jsxs("div",{className:"container mx-auto overflow-hidden my-16",children:[e.jsx("h2",{className:"px-3 font-bold",children:"Shop Popular Categories"}),e.jsx(l,{...j,children:i==null?void 0:i.data.data.map(s=>e.jsxs("div",{className:"text-center",children:[e.jsx("img",{className:"w-full h-64 object-cover p-2 ",src:s.image,alt:s.name}),e.jsx("h3",{children:s.name})]},s._id))})]})}function M(){return e.jsxs(e.Fragment,{children:[e.jsx(h,{}),e.jsx(w,{}),e.jsx(n,{})]})}export{M as default};
