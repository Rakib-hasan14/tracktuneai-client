'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('An error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
      <h2 className="text-3xl font-bold text-red-600 mb-4">Something went wrong!</h2>
      <p className="text-gray-700 mb-6">{error?.message || 'Please try again later.'}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
