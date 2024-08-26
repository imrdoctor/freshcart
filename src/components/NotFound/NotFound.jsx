import React, { useEffect, useState } from "react";
import styles from "./NotFound.module.css";
export default function notFound() {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="text-6xl font-bold mb-4">
          <i className="fas fa-exclamation-triangle text-red-600"></i> 404
        </div>
        <div className="text-2xl ">Page Not Found</div>
        <div className="text-gray-600">
          The page you are looking for does not exist or an other error
          occurred.
        </div>
      </div>
    </>
  );
}
