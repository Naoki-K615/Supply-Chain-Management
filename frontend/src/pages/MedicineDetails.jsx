import { useState, useEffect } from "react";
import { getMedicines, getMedicineStage, getMedicineHistory } from "../services/api";
import { FileSearch, Clock, Tag, Search, History, ArrowRight, Loader, AlertCircle, CheckCircle } from "lucide-react";

const Medicine = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [medicineId, setMedicineId] = useState("");
  const [medicineHistory, setMedicineHistory] = useState([]);
  const [medicineStage, setMedicineStage] = useState("");
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [historyLoading, setHistoryLoading] = useState(false);
  const [stageLoading, setStageLoading] = useState(false);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      setLoading(true);
      const response = await getMedicines();
      setMedicines(response.data);
    } catch (error) {
      showNotification("error", "Error fetching medicines");
      console.error("Error fetching medicines:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
  };

  const handleGetHistory = async () => {
    if (!medicineId) {
      showNotification("error", "Please enter a Medicine ID");
      return;
    }

    try {
      setHistoryLoading(true);
      const response = await getMedicineHistory(medicineId);

      if (response.data.length === 0) {
        showNotification("info", "No transaction history found for this medicine");
        setMedicineHistory([]);
        return;
      }

      setMedicineHistory(response.data);
      showNotification("success", "Transaction history retrieved successfully");
    } catch (error) {
      showNotification("error", "Error fetching medicine history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleGetStage = async () => {
    if (!medicineId) {
      showNotification("error", "Please enter a Medicine ID");
      return;
    }

    try {
      setStageLoading(true);
      const response = await getMedicineStage(medicineId);
      setMedicineStage(response.data.stage);
      showNotification("success", "Current stage retrieved successfully");
    } catch (error) {
      showNotification("error", "Error fetching medicine stage");
    } finally {
      setStageLoading(false);
    }
  };

  // Function to get stage badge color
  const getStageBadge = (stage) => {
    const stageColors = {
      "Ordered": { bg: "bg-yellow-100", text: "text-yellow-800", icon: <Tag size={14} className="mr-1" /> },
      "RawMaterialSupplied": { bg: "bg-blue-100", text: "text-blue-800", icon: <Tag size={14} className="mr-1" /> },
      "Manufactured": { bg: "bg-purple-100", text: "text-purple-800", icon: <Tag size={14} className="mr-1" /> },
      "Distributed": { bg: "bg-green-100", text: "text-green-800", icon: <Tag size={14} className="mr-1" /> },
      "Retail": { bg: "bg-indigo-100", text: "text-indigo-800", icon: <Tag size={14} className="mr-1" /> },
      "Sold": { bg: "bg-gray-100", text: "text-gray-800", icon: <Tag size={14} className="mr-1" /> }
    };
    
    const style = stageColors[stage] || { bg: "bg-gray-100", text: "text-gray-800", icon: <Tag size={14} className="mr-1" /> };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
        {style.icon}
        {stage}
      </span>
    );
  };

  // Function to get action badge
  const getActionBadge = (action) => {
    const actionColors = {
      "Created": "bg-blue-100 text-blue-800",
      "Updated": "bg-yellow-100 text-yellow-700",
      "StageChanged": "bg-purple-100 text-purple-800",
      "Transferred": "bg-green-100 text-green-800"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${actionColors[action] || "bg-gray-100 text-gray-800"}`}>
        {action}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {notification.show && (
          <div className={`mb-6 p-4 rounded-lg flex items-start ${
            notification.type === "success" ? "bg-green-50 text-green-700" : 
            notification.type === "error" ? "bg-red-50 text-red-700" : 
            "bg-blue-50 text-blue-700"
          }`}>
            {notification.type === "success" ? <CheckCircle className="h-5 w-5 mr-2" /> : 
             notification.type === "error" ? <AlertCircle className="h-5 w-5 mr-2" /> : 
             <FileSearch className="h-5 w-5 mr-2" />}
            <span>{notification.message}</span>
          </div>
        )}

        <div className="mb-8 flex items-center">
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-3 rounded-lg mr-4 shadow-md">
            <FileSearch className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Medicine Details</h2>
        </div>

        {/* Medicine Lookup Section */}
        <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-300 mb-4">Medicine Lookup</h3>
            <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3">
              <div className="flex-grow">
                <input 
                  type="text" 
                  placeholder="Enter Medicine ID" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  value={medicineId} 
                  onChange={(e) => setMedicineId(e.target.value)} 
                />
              </div>
              <button 
                onClick={handleGetHistory} 
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:shadow-blue-50 transition-all"
                disabled={historyLoading}
              >
                {historyLoading ? <Loader className="animate-spin h-5 w-5 mr-2" /> : <History className="h-5 w-5 mr-2" />}
                Get History
              </button>
              <button 
                onClick={handleGetStage} 
                className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg hover:shadow-md transition-all"
                disabled={stageLoading}
              >
                {stageLoading ? <Loader className="animate-spin h-5 w-5 mr-2" /> : <Tag className="h-5 w-5 mr-2" />}
                Get Stage
              </button>
            </div>
          </div>

          {/* Display Medicine Stage */}
          {medicineStage && (
            <div className="p-6 bg-gray-900">
              <div className="flex items-start">
                <div className="bg-teal-100 p-3 rounded-full mr-4">
                  <Tag className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-lg font-medium text-gray-300 mb-2">Current Stage</h4>
                  <p className="text-gray-300 mb-2">Medicine ID: <span className="font-medium text-gray-300">{medicineId}</span></p>
                  <div className="mt-2">
                    {getStageBadge(medicineStage)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Medicine History */}
        {medicineHistory.length > 0 && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="border-b border-gray-100 p-6">
              <div className="flex items-center">
                <History className="h-5 w-5 mr-3 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">Transaction History</h3>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {medicineHistory.map((txn, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-all">
                  <div className="flex items-start">
                    <div className="hidden sm:block bg-blue-100 p-2 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-wrap items-center mb-2">
                        {getActionBadge(txn.action)}
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(txn.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-1">
                        <span className="font-medium">Participant:</span> {txn.participant}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Medicine List */}
        <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center">
              <Search className="h-5 w-5 mr-3 text-gray-300" />
              <h3 className="text-xl font-semibold text-gray-300">Medicine List</h3>
            </div>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="h-10 w-10 text-teal-500 animate-spin mb-4" />
              <p className="text-gray-600">Loading medicines...</p>
            </div>
          ) : medicines.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-gray-300">No medicines found in the blockchain.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {medicines.map((med) => (
                <li key={med.blockchainId} className="p-6 hover:bg-gray-700 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <div className="mb-3 sm:mb-0">
                      <h4 className="font-medium text-gray-100">{med.name}</h4>
                      <p className="text-sm text-gray-300 mt-1">{med.description}</p>
                    </div>
                    <div className="flex items-center">
                      {getStageBadge(med.stage)}
                      <button 
                        className="ml-4 text-sm text-teal-400 hover:text-teal-500 font-medium flex items-center"
                        onClick={() => {
                          setMedicineId(med.blockchainId);
                          handleGetHistory();
                        }}
                      >
                        View History
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">ID: {med.blockchainId}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Medicine;