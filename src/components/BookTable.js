import React from "react";

export default function BookTable({ rows, columns, sortConfig, setSortConfig }) {
  const requestSort = (col) => {
    let direction = "asc";
    if (sortConfig.key === col && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col, direction });
  };

  return (
    <table className="w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col}
              className="border px-2 py-1 text-left cursor-pointer select-none"
              onClick={() => requestSort(col)}
            >
              {col}
              {sortConfig.key === col && (
                <span className="ml-1 text-xs">
                  {sortConfig.direction === "asc" ? "▲" : "▼"}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map((col) => (
              <td key={col} className="border px-2 py-1">
                {row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
