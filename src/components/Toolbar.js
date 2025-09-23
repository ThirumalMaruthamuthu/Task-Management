import React from "react";

export default function Toolbar({ onGenerate, onReset, rows, columns,downloadDisabled }) {
  const handleDownload = () => {
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
      <button onClick={onGenerate} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Generate Data
      </button>
      <button onClick={onReset} className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
        Reset Edits
      </button>
      <button onClick={handleDownload} disabled={downloadDisabled} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Download CSV
      </button>
    </div>
  );
}
