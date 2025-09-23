import React from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Pagination({ currentPage, setCurrentPage, pageCount }) {
  return (
    <div className="flex items-center gap-2 mt-2">
      <IconButton
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        color="primary"
      >
        <ArrowBackIos />
      </IconButton>

      <span className="font-medium">
        Pages {currentPage} / {pageCount}
      </span>

      <IconButton
        onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
        disabled={pageCount === 0 }
        color="primary"
      >
        <ArrowForwardIos />
      </IconButton>
    </div>
  );
}
