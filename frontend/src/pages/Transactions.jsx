import { useState, useEffect } from "react";
import { recordTransaction, getTransactions } from "../services/api";
import { FileText, User, Calendar, ChevronsRight, CheckCircle, AlertCircle, Loader, Package, TrendingUp } from "lucide-react";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    medicineId: "",
    participant: "",
    action: "",
    timestamp: Date.now(),
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await getTransactions();
      setTransactions(response.data);
    } catch (error) {
      showNotification("error", "Error fetching transactions");
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await recordTransaction(formData);
      showNotification("success", "Transaction recorded successfully!");
      fetchTransactions();
      setFormData({
        medicineId: "",
        participant: "",
        action: "",
        timestamp: Date.now(),
      });
    } catch (error) {
      showNotification("error", "Error adding transaction");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Function to get action badge
  const getActionBadge = (action) => {
    const actionColors = {
      "Shipped": "bg-blue-100 text-blue-800",
      "Received": "bg-green-100 text-green-800",
      "In Transit": "bg-yellow-100 text-yellow-800",
      "Completed": "bg-purple-100 text-purple-800"
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
            notification.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
          }`}>
            {notification.type === "success" ? 
              <CheckCircle className="h-5 w-5 mr-2 mt-0.5" /> : 
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5" />
            }
            <span>{notification.message}</span>
          </div>
        )}

        <div className="mb-16 flex items-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-lg mr-4 shadow-md">
            <TrendingUp className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Manage Transactions</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Transaction Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 flex">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                  <FileText className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold text-white flex items-center">
                  Record Transaction
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddTransaction} className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Medicine ID</label>
                    <input
                      type="text"
                      placeholder="Enter medicine ID"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={formData.medicineId}
                      onChange={(e) => setFormData({ ...formData, medicineId: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Participant Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-mono text-sm"
                      value={formData.participant}
                      onChange={(e) => setFormData({ ...formData, participant: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Action</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      value={formData.action}
                      onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                      required
                    >
                      <option value="">Select Action</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Received">Received</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow hover:shadow-lg ${
                      submitting ? "opacity-75 cursor-not-allowed" : "hover:from-blue-700 hover:to-blue-600"
                    } transition-all duration-300`}
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FileText className="h-5 w-5 mr-2" />
                        Record
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Transactions List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-3 text-blue-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Transaction History</h3>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
                    {transactions.length} Records
                  </span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-10 w-10 text-blue-500 animate-spin mb-4" />
                  <p className="text-gray-600">Loading transactions...</p>
                </div>
              ) : transactions.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="bg-blue-50 rounded-lg p-6 inline-block mb-4">
                    <FileText className="h-12 w-12 text-blue-400 mx-auto" />
                  </div>
                  <p className="text-gray-500">No transactions recorded yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Record your first transaction using the form.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {transactions.map((txn, index) => (
                    <li key={index} className="p-6 hover:bg-gray-50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <Package className="h-5 w-5 text-blue-500 mr-2" />
                            <h4 className="font-medium text-gray-900">Medicine ID: {txn.medicineId}</h4>
                            <div className="ml-3">{getActionBadge(txn.action)}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                          {new Date(txn.timestamp).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <User className="h-4 w-4 mr-1 text-gray-400" />
                        <span className="font-medium mr-1">Participant:</span>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2 font-mono text-xs text-gray-600 break-all">
                        {txn.participant}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transactions;