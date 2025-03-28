import React from "react";

function ColumnSelector({ selectedColumns, onColumnToggle, onClose }) {
  const availableColumns = [
    "Loan No.",
    "Loan Type",
    "Borrower",
    "Borrower Address",
    "Co Borrower Name",
    "Co Borrower Address",
    "Current DPD",
    "Sanction Amount",
    "Region",
  ];

  return (
    <div className="absolute left-0 top-full w-64 md:w-80 lg:w-96 bg-white shadow-md p-4 rounded border border-gray-300 z-50">
      <h3 className="text-sm md:text-base font-semibold mb-2 text-blue-500">
        Select Columns
      </h3>
      {availableColumns.map((col) => (
        <div key={col} className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={selectedColumns.includes(col)}
            onChange={() => onColumnToggle(col)}
            className="form-checkbox text-blue-500"
          />
          <span className="text-gray-700 text-xs sm:text-sm md:text-base">
            {col}
          </span>
        </div>
      ))}
      <button
        onClick={onClose}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full text-xs sm:text-sm md:text-base"
      >
        Done
      </button>
    </div>
  );
}

export default ColumnSelector;
