import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PortfolioTable from '../components/PortfolioTable';
import UploadModal from '../components/UploadModal';
import { useAppContext } from '../AppContext';
import { fetchPortfolioData } from '../components/dataService';
import { Settings, LogOut } from 'lucide-react';


function Dashboard() {
  const { state, actions } = useAppContext();

  const [selectedColumns, setSelectedColumns] = useState([
    'Loan No.', 'Loan Type', 'Borrower', 'Borrower Address',
    'Co Borrower Name', 'Co Borrower Address',
    'Current DPD', 'Sanction Amount', 'Region'
  ]);

  const handleColumnToggle = (column) => {
    setSelectedColumns((prevColumns) =>
      prevColumns.includes(column)
        ? prevColumns.filter(col => col !== column)
        : [...prevColumns, column]
    );
  };
  
  const [portfolioData, setPortfolioData] = useState({
    items: [],
    loading: true,
    error: null
  });

  // Fetch portfolio data on mount or whenever filters/pagination change
  useEffect(() => {
    const loadPortfolioData = async () => {
      try {
        const result = await fetchPortfolioData(
          state.portfolio.filters,
          state.portfolio.pagination
        );

        setPortfolioData({
          items: result.data,
          loading: false,
          error: null
        });

        // Update pagination in context
        actions.setPagination({
          currentPage: state.portfolio.pagination.currentPage,
          totalPages: result.totalPages,
          total: result.total
        });
      } catch (error) {
        setPortfolioData({
          items: [],
          loading: false,
          error: error.message
        });
      }
    };

    loadPortfolioData();
  }, [
    state.portfolio.filters,
    state.portfolio.pagination.currentPage
  ]);

  // Handlers
  const handleTabChange = (tab) => {
    actions.setActiveTab(tab);
  };

  const handleOpenUploadModal = () => {
    actions.toggleUploadModal(true);
  };



  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar (Header) */}
      <header className="flex items-center justify-between bg-white shadow-sm p-4 border-b border-blue-200">
        {/* Left: Logo/Title */}
        <h2 className="text-xl font-bold text-blue-500">resollect</h2>

        {/* Right: User Profile + Settings/Logout */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">L</span>
          </div>
          <div>
            <div className="text-sm font-semibold">Leeladhar</div>
            <div className="text-xs text-gray-500">leeladhar@gmail.com</div>
          </div>

    
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar
          activeTab={state.ui.activeTab}
          onTabChange={handleTabChange}
          onUploadClick={handleOpenUploadModal}
        />

        {/* Page Content on the right */}
        <main className="flex-grow flex flex-col bg-gray-50 relative">
          {/* Top section with the table title and column selector */}
          <div className="flex justify-between items-center p-4 border-b border-blue-200 bg-white">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-blue-500">
                {state.ui.activeTab}
              </h1>
            </div>

          </div>

          {/* The main table content */}
          <PortfolioTable
        selectedColumns={selectedColumns}
        onColumnToggle={handleColumnToggle}
      />
        </main>
      </div>

      {/* Upload Modal */}
      {state.ui.uploadModal.isOpen && (
        <UploadModal onClose={() => actions.toggleUploadModal(false)} />
      )}
    </div>
  );
}

export default Dashboard;
