import React, { useState } from "react";

export default function BookTable({ rows, columns, sortConfig, setSortConfig, onCellChange }) {
  const requestSort = (col) => {
    let direction = "asc";
    if (sortConfig.key === col && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col, direction });
  };

  const [editingRow, setEditingRow] = useState(null);
  const [rowValues, setRowValues] = useState({}); 

  const startEditing = (rowIndex) => {
    setEditingRow(rowIndex);
    setRowValues({ ...rows[rowIndex] });
  };

  const saveEditing = (rowIndex) => {
    Object.keys(rowValues).forEach((col) => onCellChange(rowIndex, col, rowValues[col]));
    setEditingRow(null);
  };

  const handleInputChange = (col, value) => {
    setRowValues((prev) => ({ ...prev, [col]: value }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 min-w-max">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="border px-3 py-2 text-left cursor-pointer select-none"
                onClick={() => requestSort(col)}
              >
                {col}
                {sortConfig.key === col && (
                  <span className="ml-1 text-xs">{sortConfig.direction === "asc" ? "▲" : "▼"}</span>
                )}
              </th>
            ))}
            <th className="border px-3 py-2 text-left select-none">ACTIONS</th> 
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={row._edited ? "bg-yellow-100" : "hover:bg-gray-50"}>
              {columns.map((col) => (
                <td key={col} className="border px-2 py-1">
                  {editingRow === i ? (
                    <input
                      type="text"
                      value={rowValues[col]}
                      onChange={(e) => handleInputChange(col, e.target.value)}
                      className="border px-1 py-0.5 rounded w-full"
                    />
                  ) : (
                    row[col]
                  )}
                </td>
              ))}
              <td className="border px-2 py-1">
                {editingRow === i ? (
                  <button
                    onClick={() => saveEditing(i)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(i)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
