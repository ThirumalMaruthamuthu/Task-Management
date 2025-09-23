import React from "react";

export default function Pagination({ currentPage, setCurrentPage, pageCount,nextDisabled }) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 bg-blue-500 text-white border rounded"
      >
        Prev
      </button>
      <span>
        Page {currentPage} / {pageCount}
      </span>
      <button
        disabled={pageCount === 0}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 bg-blue-600 text-white border rounded"
      >
        Next
      </button> 
    </div>
  );
}
