import{r as l,A as n,j as e}from"./index-BJfZhxjA.js";import{l as x}from"./Loader-DPb39At9.js";function h(){const{getAllOrders:r,orders:a={data:[]},loading:c}=l.useContext(n),[i,d]=l.useState(0);return l.useEffect(()=>{r&&r()},[r]),l.useEffect(()=>{a.data&&d(a.data.length)},[a.data]),c?e.jsx(x,{}):e.jsx(e.Fragment,{children:e.jsx("div",{className:"mt-24 flex items-center justify-center",children:e.jsxs("div",{className:"w-full mb-6 bg-gray-100 shadow-2xl rounded-lg overflow-hidden",children:[e.jsxs("div",{className:"p-6 bg-green-100 border-b border-green-300",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-gray-800 text-center",children:"Your All Orders"}),e.jsx("div",{className:"flex justify-between flex-wrap text-center mt-4",children:e.jsxs("h2",{className:"text-xl font-semibold text-gray-700",children:[e.jsx("i",{className:"fa-solid fa-bag-shopping text-green-700"})," Your Orders: ",e.jsx("span",{className:"font-bold text-gray-800",children:i})]})})]}),e.jsx("div",{className:"p-6 my-6",children:a.data.length>0?a.data.map(t=>e.jsx("div",{className:"p-2",children:e.jsxs("div",{className:"flex flex-wrap items-center justify-center lg:justify-between bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300",children:[e.jsx("div",{className:"flex flex-wrap items-center justify-center lg:justify-between p-2 space-x-4",children:e.jsxs("div",{className:"text-center p-2",children:[e.jsxs("h3",{className:"text-lg font-semibold text-gray-900",children:["Order ID: ",t.id]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Created At: ",new Date(t.createdAt).toLocaleDateString()]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Paid At: ",t.paidAt?new Date(t.paidAt).toLocaleDateString():"Not Paid"]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Payment Method: ",t.paymentMethodType==="card"?t.paymentMethodType:"Cash on delivery"]}),e.jsxs("p",{className:"text-lg font-semibold text-green-500",children:[e.jsx("i",{className:"fa-solid fa-coins text-green-500"})," ",t.totalOrderPrice," EGP"]})]})}),e.jsx("div",{className:"w-full mt-4",children:t.cartItems&&t.cartItems.length>0?t.cartItems.map(s=>e.jsx("div",{className:"flex items-center justify-between p-2 border-b border-gray-300",children:e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("img",{src:s.product.imageCover,className:"w-16 h-16 object-cover rounded-lg",alt:s.product.imageCover}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-lg font-semibold text-gray-900",children:s.title}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Price: ",s.price," EGP"]}),e.jsxs("p",{className:"text-sm text-gray-600",children:["Name: ",s.product.title.split(" ").slice(0,2).join(" ")]})]})]})},s._id)):e.jsx("p",{className:"text-center text-red-600",children:"No items in cart."})})]})},t.id)):e.jsxs("p",{className:"text-center text-gray-600 text-red-600",children:[e.jsx("i",{className:"fa-solid fa-x text-sm"})," You did not add any product to cart"]})})]})})})}export{h as default};
