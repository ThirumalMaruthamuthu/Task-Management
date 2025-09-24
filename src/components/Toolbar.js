import React, { useState } from "react";

export default function Toolbar({ onGenerate, onReset, rows, columns }) {
  const [generated, setGenerated] = useState(false);

  const handleGenerateClick = () => {
    if (generated) {
      alert("Data already generated! Reset before generating again.");
      return;
    }
    onGenerate();
    setGenerated(true);
  };

  const handleResetClick = () => {
    onReset();
    setGenerated(false); 
  };

  const handleDownload = () => {
    if (!rows || rows.length === 0) {
      alert("No data available to download!");
      return;
    }

    const csvContent = [
      columns.join(","),
      ...rows.map(row => columns.map(c => row[c]).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "edited_books.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={handleGenerateClick}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Generate Data
      </button>
      <button
        onClick={handleResetClick}
        className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
      >
        Reset Edits
      </button>
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Download CSV
      </button>
    </div>
  );
}
