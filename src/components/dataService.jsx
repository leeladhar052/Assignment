  // Simulated API calls and data management
  const generateMockPortfolioData = (count = 50) => {
      const loanTypes = ['Home Loan', 'Car Loan', 'Personal Loan'];
      const regions = ['West', 'North', 'East', 'South'];
    
      return Array.from({ length: count }, (_, index) => ({
        loanNo: `L2636${2500 + index}`,
        loanType: loanTypes[index % loanTypes.length],
        borrower: `Borrower ${index + 1}`,
        borrowerAddress: `${index + 1} Sample Street, City ${index + 1}`,
        coBorrowerName: `Co Borrower ${index + 1}`,
        coBorrowerAddress: `${index + 50} Another Street, City ${index + 1}`,
        currentDPD: `${Math.floor(Math.random() * 100)}`,
        sanctionAmount: `₹ ${(Math.random() * 2000000).toFixed(2)}`,
        region: regions[index % regions.length]
      }));
    };
    
    export const fetchPortfolioData = async (filters = {}, pagination = {}) => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
    
      const allData = generateMockPortfolioData();
      
      // Apply filters (if implemented)
      const filteredData = allData.filter(item => {
        return Object.entries(filters).every(([key, value]) => 
          !value || item[key] === value
        );
      });
    
      // Pagination
      const { currentPage = 1, itemsPerPage = 10 } = pagination;
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedData = filteredData.slice(
        startIndex, 
        startIndex + itemsPerPage
      );
    
      return {
        data: paginatedData,
        total: filteredData.length,
        totalPages: Math.ceil(filteredData.length / itemsPerPage)
      };
    };
    
    export const uploadDocument = async (documentData) => {
      // Simulate document upload
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation and upload
      if (!documentData.file) {
        throw new Error('No file selected');
      }
    
      return {
        success: true,
        message: 'Document uploaded successfully',
        documentId: `DOC-${Date.now()}`
      };
    };