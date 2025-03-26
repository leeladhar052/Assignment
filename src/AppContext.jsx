import React, { createContext, useReducer, useContext } from 'react';

// Initial State
const initialState = {
  user: {
    name: 'Tushar',
    email: 'tushar@rcollect.com',
    avatar: null
  },
  portfolio: {
    data: [],
    loading: false,
    error: null,
    filters: {},
    selectedColumns: [
      'Loan No.', 'Loan Type', 'Borrower', 
      'Borrower Address', 'Co Borrower Name', 
      'Co Borrower Address', 'Current DPD', 
      'Sanction Amount', 'Region'
    ],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10
    }
  },
  ui: {
    activeTab: 'Portfolio',
    uploadModal: {
      isOpen: false,
      step: 'initial' // 'initial', 'uploading', 'success', 'error'
    }
  }
};

//Action Types
const ACTION_TYPES = {
    SET_USER: "SET_USER",
    SET_PORTFOLIO_DATA: "SET_PORTFOLIO_DATA",
    SET_PORTFOLIO_LOADING: "SET_PORTFOLIO_LOADING",
    SET_PORTFOLIO_ERROR: "SET_PORTFOLIO_ERROR",
    SET_SELECTED_COLUMNS: "SET_SELECTED_COLUMNS",
    SET_PAGINATION: "SET_PAGINATION",
    SET_ACTIVE_TAB: "SET_ACTIVE_TAB",
    TOGGLE_UPLOAD_MODAL: "TOGGLE_UPLOAD_MODAL",
    SET_UPLOAD_STEP: "SET_UPLOAD_STEP"
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPES.SET_USER:
      return { ...state, user: { ...state.user, ...action.payload } };
    case ACTION_TYPES.SET_PORTFOLIO_DATA:
      return { 
        ...state, 
        portfolio: { 
          ...state.portfolio, 
          data: action.payload 
        } 
      };
    case ACTION_TYPES.SET_SELECTED_COLUMNS:
      return { 
        ...state, 
        portfolio: { 
          ...state.portfolio, 
          selectedColumns: action.payload 
        } 
      };
    case ACTION_TYPES.SET_ACTIVE_TAB:
      return { 
        ...state, 
        ui: { 
          ...state.ui, 
          activeTab: action.payload 
        } 
      };
    case ACTION_TYPES.TOGGLE_UPLOAD_MODAL:
      return { 
        ...state, 
        ui: { 
          ...state.ui, 
          uploadModal: { 
            ...state.ui.uploadModal, 
            isOpen: action.payload 
          } 
        } 
      };
    default:
      return state;
  }
}

// Context Providers
const AppContext = createContext();

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Action Creators
  const actions = {
    setUser: (userData) => dispatch({ 
      type: ACTION_TYPES.SET_USER, 
      payload: userData 
    }),
    setPortfolioData: (data) => dispatch({ 
      type: ACTION_TYPES.SET_PORTFOLIO_DATA, 
      payload: data 
    }),
    setSelectedColumns: (columns) => dispatch({ 
      type: ACTION_TYPES.SET_SELECTED_COLUMNS, 
      payload: columns 
    }),
    setActiveTab: (tab) => dispatch({ 
      type: ACTION_TYPES.SET_ACTIVE_TAB, 
      payload: tab 
    }),
    toggleUploadModal: (isOpen) => dispatch({ 
      type: ACTION_TYPES.TOGGLE_UPLOAD_MODAL, 
      payload: isOpen 
    })
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook for using Context
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}