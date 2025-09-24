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
      <label className="block w-full cursor-pointer">
        <span className="block text-sm font-medium text-gray-700 mb-1">
          Upload CSV
        </span>
        <input
          type="file"
          accept=".csv,text/csv"
          onChange={handleChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md
                     px-3 py-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </label>
    </div>
  );
}
