import React, { useState } from 'react';
import { X, FileUp, CheckCircle, AlertCircle } from 'lucide-react';
import { uploadDocument } from './dataService';

function UploadModal({ onClose }) {
  const [documentData, setDocumentData] = useState({
    name: '',
    type: '',
    file: null,
    remarks: ''
  });
  const [uploadStatus, setUploadStatus] = useState('initial');
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setDocumentData(prev => ({
      ...prev,
      file,
      name: file ? file.name : ''
    }));
  };

  const handleUpload = async () => {
    setUploadStatus('uploading');
    try {
      await uploadDocument(documentData);
      setUploadStatus('success');
    } catch (error) {
      setUploadStatus('error');
      setUploadError(error.message);
    }
  };

  const renderContent = () => {
    switch(uploadStatus) {
      case 'initial':
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Name
                </label>
                <input 
                  type="text" 
                  value={documentData.name}
                  onChange={(e) => setDocumentData(prev => ({
                    ...prev, 
                    name: e.target.value
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="Enter document name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select 
                  value={documentData.type}
                  onChange={(e) => setDocumentData(prev => ({
                    ...prev, 
                    type: e.target.value
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                >
                  <option value="">Select Document Type</option>
                  <option value="loan">Loan Document</option>
                  <option value="identity">Identity Proof</option>
                  <option value="address">Address Proof</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Document Remarks
                </label>
                <textarea 
                  value={documentData.remarks}
                  onChange={(e) => setDocumentData(prev => ({
                    ...prev, 
                    remarks: e.target.value
                  }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                  rows="3"
                  placeholder="Enter any additional remarks"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select File
                </label>
                <div className="border-2 border-dashed border-blue-300 rounded-md p-6 text-center cursor-pointer">
                  <input 
                    type="file" 
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor="file-upload" 
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FileUp className="w-10 h-10 text-blue-500 mb-2" />
                    <p className="text-gray-600 text-sm">
                      {documentData.file 
                        ? `Selected: ${documentData.file.name}` 
                        : 'Drag & drop files or Click to upload'}
                    </p>
                    <span className="text-xs text-gray-500 mt-1">
                      (Max file size: 25MB)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons - Responsive */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <button 
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100 w-full sm:w-auto"
              >
                Cancel
              </button>
              <button 
                onClick={handleUpload}
                disabled={!documentData.file || !documentData.type || !documentData.name}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 w-full sm:w-auto"
              >
                Upload
              </button>
            </div>
          </>
        );
      case 'uploading':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin mb-4">
              <FileUp className="w-12 h-12 text-blue-500" />
            </div>
            <p className="text-gray-600">Uploading document...</p>
          </div>
        );
      case 'success':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Successful</h3>
            <p className="text-gray-600 mb-4">Your document has been uploaded.</p>
            <button 
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="flex flex-col items-center justify-center py-12">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Upload Failed</h3>
            <p className="text-gray-600 mb-4">{uploadError || 'An error occurred'}</p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button 
                onClick={() => setUploadStatus('initial')}
                className="px-4 py-2 border rounded-md"
              >
                Try Again
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Close
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-lg shadow-lg">
        <div className="flex justify-between items-center p-4 border-b border-blue-200">
          <h2 className="text-xl font-semibold text-blue-500">Upload Document</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
