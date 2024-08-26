import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav.jsx';
import Footer from '../Footer/Footer.jsx';

export default function LayOut() {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow flex items-center justify-center">
        <div className="container w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
