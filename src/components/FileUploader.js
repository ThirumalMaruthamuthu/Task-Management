import React from "react";
import Papa from "papaparse";

export default function FileUploader({ onUpload }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        onUpload(results.data);
      },
    });
  };

  return (
    <div className="my-4">
      <input
        type="file"
        accept=".csv"
        onChange={handleChange}
        className="border-2 border-gray-300 rounded-md px-3 py-2 w-100 cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}
