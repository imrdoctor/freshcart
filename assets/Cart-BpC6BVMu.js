import{r,C,j as e,L as k,_ as E}from"./index-BJfZhxjA.js";import{l as L}from"./Loader-DPb39At9.js";function O(){var c,i,l,x,u,g;const{getCart:m,removeProduct:f,updateQuantity:p}=r.useContext(C),[s,b]=r.useState([]),[j,y]=r.useState(!0),[v,N]=r.useState(null);async function o(){try{const t=await m();b(t),N(t.data.data._id)}catch(t){console.error("Error fetching cart info:",t)}finally{y(!1)}}async function w(t){try{(await f(t)).status===200?(E.success("Product Deleted",{style:{background:"#22d210",color:"#fff"}}),o()):console.log("Error deleting product")}catch(a){console.error("Error deleting product:",a)}}async function n(t,a){try{(await p(t,a)).status===200?o():console.error("Error updating quantity")}catch(h){console.error("Error updating quantity:",h)}}if(r.useEffect(()=>{o()},[]),j)return e.jsx(L,{});const d=((i=(c=s.data)==null?void 0:c.data)==null?void 0:i.products.length)>0;return e.jsx("div",{className:"mt-24 flex items-center justify-center",children:e.jsxs("div",{className:"w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden",children:[e.jsxs("div",{className:"p-6 bg-green-100 border-b border-green-300",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-gray-800 text-center",children:"Shopping Cart"}),e.jsxs("div",{className:"flex justify-between flex-wrap text-center mt-4",children:[e.jsxs("h2",{className:"text-xl font-semibold text-gray-700",children:[e.jsx("i",{className:"fa-solid fa-coins text-green-500"})," Total Price: ",e.jsx("span",{className:"font-bold text-gray-800",children:(l=s.data)==null?void 0:l.data.totalCartPrice})," EGP"]}),e.jsxs("h2",{className:"text-xl font-semibold text-gray-700",children:[e.jsx("i",{className:"fa-solid fa-cart-shopping text-green-500"})," Cart Items: ",e.jsx("span",{className:"font-bold text-gray-800",children:(x=s.data)==null?void 0:x.numOfCartItems})]})]})]}),e.jsx("div",{className:"p-6 my-6",children:d?(g=(u=s.data)==null?void 0:u.data)==null?void 0:g.products.map(t=>e.jsx("div",{className:"p-2",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300",children:[e.jsxs("div",{className:"flex flex-wrap items-center justify-center lg:justify-between p-2 items-center space-x-4",children:[e.jsx("div",{children:e.jsx("img",{src:t.product.imageCover,className:"object-cover h-36 w-36 rounded-lg border border-gray-200",alt:t.title})}),e.jsxs("div",{className:"text-center p-2",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900",children:t.title}),e.jsx("p",{className:"text-gray-600",children:t.product.title.split(" ").slice(0,2).join(" ")}),e.jsxs("p",{className:"text-lg font-semibold text-green-500",children:[e.jsx("i",{className:"fa-solid fa-coins text-green-500"})," ",t.price," EGP"]}),e.jsxs("button",{onClick:()=>w(t.product.id),className:"text-red-800 border border-2 border-red-500 bg-red-300 p-2 rounded-lg hover:text-white hover:bg-red-800 hover:border-red-600 font-medium transition-colors duration-300",children:[e.jsx("i",{className:"fa-solid fa-trash"})," Remove"]})]})]}),e.jsx("div",{className:"flex items-center p-2",children:e.jsxs("div",{className:"flex items-center flex-wrap space-x-2",children:[e.jsx("button",{disabled:t.count===1,onClick:()=>n(t.product.id,t.count-1),className:"p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300",type:"button",children:e.jsx("svg",{className:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 2",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M1 1h16"})})}),e.jsx("input",{type:"number",className:"bg-gray-50 w-20 text-center border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-green-500",value:t.count,readOnly:!0}),e.jsx("button",{onClick:()=>n(t.product.id,t.count+1),className:"p-2 bg-gray-200 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300",type:"button",children:e.jsx("svg",{className:"w-4 h-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 18",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M9 1v16M1 9h16"})})})]})})]})},t.product.id)):e.jsxs("p",{className:"text-center text-gray-600 text-red-600",children:[e.jsx("i",{className:"fa-solid fa-x text-sm"})," You did not add any product to cart"]})}),d?e.jsx("div",{className:"px-12",children:e.jsx(k,{to:`/freshcart/checkOut/${v}`,children:e.jsxs("button",{className:"text-green-800 w-full my-3 border border-1 border-green-500 bg-green-300 p-2 rounded-lg hover:text-white hover:bg-green-800 hover:border-green-600 font-medium transition-colors duration-300",children:[e.jsx("i",{className:"fa-regular fa-credit-card"})," Continue to CheckOut"]})})}):null]})})}export{O as default};
