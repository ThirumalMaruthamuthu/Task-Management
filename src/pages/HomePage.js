import React, { useState, useMemo } from "react";
import FileUploader from "../components/FileUploader";
import Toolbar from "../components/Toolbar";
import BookTable from "../components/BookTable";
import Pagination from "../components/Pagination";
import { parseCSV } from "../utils/csvHelpers";
import { generateFakeBooks } from "../utils/fakerData";

const columns = ["Title", "Author", "Genre", "PublishedYear", "ISBN"];

export default function HomePage() {
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const handleUpload = (file) => {
    parseCSV(file, (data) => {
      setRows(data);
      setOriginalRows([...data]);
    });
  };

  const handleGenerate = () => {
    const data = generateFakeBooks(10000);
    setRows(data);
    setOriginalRows([...data]);
  };

  const resetAll = () => {
    setRows([...originalRows]);
    setSortConfig({ key: null, direction: null });
  };

  //  Sorting
  const sortedRows = useMemo(() => {
    if (!sortConfig.key) return rows;

    const sorted = [...rows].sort((a, b) => {
      let A = a[sortConfig.key] ?? "";
      let B = b[sortConfig.key] ?? "";

      if (sortConfig.key === "PublishedYear") {
        A = Number(A);
        B = Number(B);
      }

      if (A < B) return sortConfig.direction === "asc" ? -1 : 1;
      if (A > B) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [rows, sortConfig]);

  //  Pagination
  const pageCount = Math.ceil(sortedRows.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const pageRows = sortedRows.slice(start, start + pageSize);


  const handleCellChange = (rowIndex, column, newValue) => {
  setRows(prevRows => {
    const updatedRows = [...prevRows];
    updatedRows[rowIndex] = {
      ...updatedRows[rowIndex],
      [column]: newValue,
      _edited: true, 
    };
    return updatedRows;
  });
};

  return (
    <div className="p-4">
        {/* Toolbar */}
      <h1 className="text-2xl font-bold mb-4">Book CSV Editor</h1>
      <Toolbar
        onGenerate={handleGenerate}
        onReset={resetAll}
        rows={rows}
        columns={columns}
        downloadDisabled={pageRows.length ===0}
      />
      <FileUploader onUpload={handleUpload} />

      {/* Table Data Count */}
      <div className="flex justify-between items-center my-2 text-sm text-gray-700">
        <span>
          Showing {pageRows.length} of {sortedRows.length} entries
        </span>
        <span>Total rows: {rows.length}</span>
      </div>

      {/* Table Data */}

      <BookTable
        rows={pageRows}
        columns={columns}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        onCellChange={handleCellChange}
      />
      {/* Pagination and Table count */}
      <div className="flex justify-between">
        <div className="flex items-center gap-2 my-2">
          <label className="text-sm text-gray-700">Rows per page:</label>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border px-2 py-1 rounded"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
          </select>
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
}
