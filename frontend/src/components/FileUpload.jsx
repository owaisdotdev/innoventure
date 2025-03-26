// src/components/FileUpload.jsx
import React from 'react';

const FileUpload = ({ register, name }) => {
  return (
    <input
      type="file"
      {...register(name, { required: true })}
      accept=".pdf,image/*" // Accept PDFs and all image types
      className="w-full mt-1 text-gray-200"
    />
  );
};

export default FileUpload;