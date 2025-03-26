import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import PortfolioTable from '../components/PortfolioTable';
import UploadModal from '../components/UploadModal';
import { useAppContext } from '../AppContext';
import { fetchPortfolioData } from '../components/dataService';
import { Menu } from 'lucide-react';

function Dashboard() {
  const { state, actions } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Toggle for mobile sidebar
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
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  };

  const handleOpenUploadModal = () => {
    actions.toggleUploadModal(true);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar (Header) */}
      <header className="flex items-center justify-between bg-white shadow-sm p-4 border-b border-blue-200">
        {/* Left: Hamburger menu for mobile + Logo */}
        <div className="flex items-center space-x-3">
          <button
            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-blue-500">resollect</h2>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 font-semibold">L</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold">Leeladhar</div>
            <div className="text-xs text-gray-500">leeladhar@gmail.com</div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar - Responsive */}
        <div className={`fixed lg:static inset-y-0 left-0 transform lg:translate-x-0 transition-transform duration-300 ease-in-out 
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          bg-white w-64 shadow-lg lg:shadow-none z-50`}
        >
          <Sidebar
            activeTab={state.ui.activeTab}
            onTabChange={handleTabChange}
            onUploadClick={handleOpenUploadModal}
          />
        </div>

        {/* Page Content */}
        <main className="flex-grow flex flex-col bg-gray-50 relative">
          {/* Page Title */}
          <div className="flex justify-between items-center p-4 border-b border-blue-200 bg-white">
            <h1 className="text-xl font-semibold text-blue-500">
              {state.ui.activeTab}
            </h1>
          </div>

          {/* Main Table Content - Responsive */}
          <div className="overflow-auto">
            <PortfolioTable
              selectedColumns={selectedColumns}
              onColumnToggle={handleColumnToggle}
            />
          </div>
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

