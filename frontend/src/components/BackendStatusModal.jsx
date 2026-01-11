import { useEffect, useState } from 'react';
import axios from 'axios';

const BackendStatusModal = () => {
  const [isBackendDown, setIsBackendDown] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  const checkBackend = async () => {
    try {
      const backendUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      await axios.get(backendUrl, { timeout: 5000 });
      setIsBackendDown(false);
      setIsChecking(false);
    } catch (error) {
      setIsBackendDown(true);
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRetry = () => {
    setIsChecking(true);
    checkBackend();
  };

  if (!isBackendDown) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Backend Server Not Available
          </h3>
          
          <p className="text-sm text-gray-600 mb-6">
            The backend server is not responding. Please start the backend server to use all features.
          </p>
          
          <div className="bg-gray-50 rounded p-3 mb-6 text-left">
            <p className="text-xs font-mono text-gray-700">
              cd backend<br />
              npm start
            </p>
          </div>
          
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isChecking ? 'Checking...' : 'Retry Connection'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackendStatusModal;
