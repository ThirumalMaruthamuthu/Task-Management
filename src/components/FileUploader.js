import React from "react";

export default function FileUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="my-4">
      <input type="file" accept=".csv" onChange={handleChange} />
    </div>
  );
}
