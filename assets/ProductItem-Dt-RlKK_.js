import{r as i,W as j,j as s,L as g}from"./index-CkReQHy5.js";function N({product:e,loading:a,cruntid:t,addToCart:d,AddWishList:o,removewashList:c}){const{wishList:r,removecruntid:l,addcruntid:n}=i.useContext(j),[x,m]=i.useState(!1);return i.useEffect(()=>{const f=r.some(h=>h.id===e.id);m(f)},[r,e.id]),s.jsx("div",{className:"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 p-1 mb-6 relative  group ",children:s.jsx("div",{className:"product py-2 relative border-transparent rounded-xl border-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-700 p-2",children:s.jsxs("figure",{className:"relative overflow-hidden",children:[s.jsx("img",{className:"w-full",src:e.imageCover,alt:e.name}),s.jsxs("figcaption",{className:"mt-2 ",children:[s.jsx("p",{className:"text-indigo-600",children:e.category.name}),s.jsx("p",{className:"text-lg font-semibold text-gray-800 mb-4",children:e.title.split(" ").slice(0,2).join(" ")}),s.jsxs("div",{className:"flex justify-between items-center mb-4",children:[s.jsxs("span",{className:"text-gray-700 font-semibold",children:[e.price," EGP"]}),s.jsxs("div",{className:"flex flex-wrap justify-center items-center gap-4",children:[s.jsxs("span",{className:"text-yellow-300 font-semibold d-flex flex-row",children:[e.ratingsAverage," ",s.jsx("i",{className:"fa fa-star"})]}),s.jsx("span",{className:"cursor-pointer",children:x?s.jsx("button",{disabled:l&&e.id==l,onClick:c,className:"text-red-700",children:s.jsx("i",{className:"fa fa-heart text-red-600 hover:text-red-400 fa-xl"})}):s.jsx("button",{disabled:n&&e.id==n,onClick:o,className:"text-gray-300",children:s.jsx("i",{className:"fa fa-heart text-gray-300 hover:text-red-600 fa-xl"})})})]})]}),s.jsxs("div",{className:"flex flex-col gap-2 justify-center items-center transition-transform transform group-hover:translate-y-0 translate-y-full",children:[s.jsx("button",{disabled:a&&e.id==t,onClick:()=>d(e.id),className:"bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform",children:a&&e.id===t?s.jsxs(s.Fragment,{children:[s.jsx("i",{className:"fa-solid fa-spinner fa-spin-pulse"})," ",s.jsx("span",{children:"loading"})]}):s.jsxs("span",{children:[" ",s.jsx("i",{className:"fa-solid fa-cart-shopping mr-2"})," "," "," Add To Cart"]})}),s.jsx(g,{to:`/freshcart/productdetails/${e.id}`,children:s.jsxs("button",{className:"bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform",children:[s.jsx("i",{className:"fa-solid fa-info-circle mr-2"})," ",s.jsx("span",{children:"Product Details"})]})})]})]})]})})},e.id)}export{N as P};