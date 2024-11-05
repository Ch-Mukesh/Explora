// src/pages/PageNotFound.jsx

import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background dark:bg-background-900">
      <div className="text-center">
        <h1 className="text-6xl md:text-9xl font-bold text-text-800 dark:text-white mb-4">404</h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl hover:bg-gray-800 dark:hover:bg-gray-300 transition-all">
            Go Back Home
          </button>
        </Link>
      </div>
      <img 
        src="https://via.placeholder.com/400" 
        alt="Page Not Found Illustration" 
        className="w-full max-w-md mt-8"
      />
    </div>
  );
}

export default PageNotFound;
