import React from "react";
import Papa from "papaparse";

export default function Toolbar({ onGenerate, onReset, rows, columns }) {
  const downloadCSV = () => {
    const csv = Papa.unparse(rows, { columns });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edited_books.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex gap-2 mb-4">
      <button onClick={onGenerate} className="px-3 py-2 bg-green-500 text-white rounded">
        Generate 10,000 Sample Rows
      </button>
      <button onClick={downloadCSV} className="px-3 py-2 bg-blue-500 text-white rounded">
        Download CSV
      </button>
      <button onClick={onReset} className="px-3 py-2 bg-red-500 text-white rounded">
        Reset All
      </button>
    </div>
  );
}
