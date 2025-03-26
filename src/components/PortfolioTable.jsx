import React, { useState, useEffect } from 'react';


function ColumnSelector({ selectedColumns, onColumnToggle, onClose }) {
  const availableColumns = [
    'Loan No.', 'Loan Type', 'Borrower', 'Borrower Address',
    'Co Borrower Name', 'Co Borrower Address',
    'Current DPD', 'Sanction Amount', 'Region'
  ];

  return (
    <div className="absolute left-0 top-100 w-full bg-white shadow-md p-2 rounded border border-blue-100 mt-[370px] z-100">
      <h3 className="text-sm font-semibold mb-2 text-blue-500">Select Columns</h3>
      {availableColumns.map((col) => (
        <div key={col} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedColumns.includes(col)}
            onChange={() => onColumnToggle(col)}
            className="form-checkbox text-blue-500"
          />
          <span className="text-gray-700">{col}</span>
        </div>
      ))}
      <button
        onClick={onClose}
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
        Done
      </button>
    </div>
  );
}


function PortfolioTable({ selectedColumns, onColumnToggle }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isColumnSelectorOpen, setIsColumnSelectorOpen] = useState(false);
  const [sampleData, setSampleData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const filters = ['All', 'Pre Sarfaesi', 'NPA', '13(2) Responses', 'Symbolic Possession', 'DM Order', 'Physical Possessions', 'Auctions'];
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  
  const fullColumns = [
    'Loan No.', 'Loan Type', 'Borrower', 'Borrower Address',
    'Co Borrower Name', 'Co Borrower Address',
    'Current DPD', 'Sanction Amount', 'Region'
  ];

  const columnKeyMap = {
    'Loan No.': 'loanNo',
    'Loan Type': 'loanType',
    'Borrower': 'borrower',
    'Borrower Address': 'borrowerAddress',
    'Co Borrower Name': 'coBorrowerName',
    'Co Borrower Address': 'coBorrowerAddress',
    'Current DPD': 'currentDPD',
    'Sanction Amount': 'sanctionAmount',
    'Region': 'region',
  };

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setSampleData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleRowSelect = (loanNo) => {
    setSelectedRows(prev =>
      prev.includes(loanNo)
        ? prev.filter(id => id !== loanNo)
        : [...prev, loanNo]
    );
  };

  const handleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === sampleData.length
        ? []
        : sampleData.map(row => row.loanNo)
    );
  };

  const handleColumnToggle = (column) => {
    const currentColumns = state.portfolio.selectedColumns || [];
    const newColumns = currentColumns.includes(column)
      ? currentColumns.filter(col => col !== column)
      : [...currentColumns, column];

    actions.setSelectedColumns(newColumns);
  };

  // **Filter Data Based on Search Query**
  const filteredData = sampleData
  .filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  )
  .filter(row => selectedFilter === 'All' || row.status === selectedFilter);


const totalPages = Math.ceil(filteredData.length / rowsPerPage);
const startIndex = (currentPage - 1) * rowsPerPage;
const endIndex = startIndex + rowsPerPage;
const displayedData = filteredData.slice(startIndex, endIndex);


  return (
    <div className="flex-grow overflow-auto p-4">

      <div className="mb-3 flex space-x-2">
        {filters.map(filter => (
          <button
            key={filter}
            className={`px-4 py-2 text-sm rounded border ${selectedFilter === filter ? 'bg-blue-500 text-white' : 'border-gray-300 text-gray-700'}`}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        {/* Search Input aligned to the left */}
        <input
          type="text"
          placeholder="Search Loan Records..."
          className="w-1/3 p-1 border rounded-md shadow-sm outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Right Section: Select Columns and More Filters */}
        <div className="relative flex items-center space-x-2">
          <button
            onClick={() => setIsColumnSelectorOpen(!isColumnSelectorOpen)}
            className="border rounded px-3 py-2 text-sm flex items-center border-blue-300 text-blue-500 hover:bg-blue-50"
          >
            Select Columns
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Column Selector Dropdown */}
          {isColumnSelectorOpen && (
            <ColumnSelector
            selectedColumns={selectedColumns}
            onColumnToggle={onColumnToggle}
            onClose={() => setIsColumnSelectorOpen(false)}
            />
          )}

          <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
            More Filters
          </button>
        </div>
      </div>
      
      {/* Selected Items Count and Names */}
      <div className="mb-2 text-sm text-blue-600">
        {selectedRows.length > 0 ? (
          <p>
            Selected Loans: {selectedRows.length}
          </p>
        ) : (
          <p>No loans selected</p>
        )}
      </div>

      {/* Portfolio Table */}
      <table className="w-full text-sm border border-gray-200">
        <thead className="bg-blue-50 top-0 z-10">
          <tr>
            <th className="p-3 text-left w-10 border border-gray-200">
              <input
                type="checkbox"
                className="form-checkbox text-blue-500"
                checked={selectedRows.length === sampleData.length}
                onChange={handleSelectAll}
              />
            </th>
            {fullColumns.map((col) => (
              selectedColumns.includes(col) && (
                <th
                  key={col}
                  className="p-3 text-xs font-medium text-blue-600 uppercase tracking-wider text-left border border-gray-200"
                >
                  {col}
                </th>
              )
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-100">
            {displayedData.length > 0 ? (
              displayedData.map((row) => (
              <tr
                key={row.loanNo}
                className="hover:bg-blue-50"
              >
                <td className="p-3 border border-gray-200">
                  <input
                    type="checkbox"
                    className="form-checkbox text-blue-500"
                    checked={selectedRows.includes(row.loanNo)}
                    onChange={() => handleRowSelect(row.loanNo)}
                  />
                </td>
                {fullColumns.map((col) => {
                  if (!selectedColumns.includes(col)) return null;

                  const key = columnKeyMap[col];
                  return (
                    <td key={col} className="p-3 border border-gray-200">
                      {row[key]}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={selectedColumns.length + 1} className="text-center p-4 text-gray-500">
                No matching results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
        <div className="bg-white border-t p-3 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`border rounded px-3 py-1 text-sm ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50'}`}
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`border rounded px-3 py-1 text-sm ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50'}`}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
}

export default PortfolioTable;
