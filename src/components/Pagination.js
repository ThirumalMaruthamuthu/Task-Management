import React from "react";

export default function Pagination({ currentPage, setCurrentPage, pageCount }) {
  return (
    <div className="flex gap-2 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((p) => p - 1)}
        className="px-3 py-1 border rounded"
      >
        Prev
      </button>
      <span>
        Page {currentPage} / {pageCount}
      </span>
      <button
        disabled={currentPage === pageCount}
        onClick={() => setCurrentPage((p) => p + 1)}
        className="px-3 py-1 border rounded"
      >
        Next
      </button> 
    </div>
  );
}
