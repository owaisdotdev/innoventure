import React from 'react';
import './Loader.css'; // keep your animation styles here

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <span className="loader"></span>
    </div>
  );
}
