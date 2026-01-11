import { useState, useEffect } from "react";
import { addShipment, getAllShipments, updateShipmentStatus } from "../services/api";
import { 
  Truck, Package, ArrowRight, User, CheckCircle, AlertCircle, 
  Loader, BarChart3, RefreshCw, Tag
} from "lucide-react";

const Shipments = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    medicineId: "",
    sender: "",
    receiver: "",
    trackingId: "",
  });

  const [updateData, setUpdateData] = useState({
    trackingId: "",
    status: "",
  });

  useEffect(() => {
    fetchShipments();
  }, []);

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const response = await getAllShipments();
      setShipments(response.data);
    } catch (error) {
      showNotification("error", "Error fetching shipments");
      console.error("Error fetching shipments:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
  };

  const handleAddShipment = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await addShipment(formData);
      showNotification("success", "Shipment created successfully!");
      fetchShipments();
      setFormData({
        medicineId: "",
        sender: "",
        receiver: "",
        trackingId: "",
      });
    } catch (error) {
      showNotification("error", "Error creating shipment");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateShipmentStatus = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      await updateShipmentStatus({
        trackingId: updateData.trackingId,
        status: updateData.status,
      });
      
      showNotification("success", "Shipment status updated successfully!");
      fetchShipments();
      setUpdateData({ trackingId: "", status: "" });
    } catch (error) {
      showNotification("error", "Error updating shipment status");
      console.error("Error updating shipment:", error.response || error);
    } finally {
      setUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      "Pending": "bg-yellow-100 text-yellow-800",
      "InTransit": "bg-blue-100 text-blue-800",
      "Delivered": "bg-green-100 text-green-800"
    };
    
    const displayStatus = status === "InTransit" ? "In Transit" : status;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status] || "bg-gray-100 text-gray-800"}`}>
        {displayStatus}
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
          <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-3 rounded-lg mr-4 shadow-md">
            <Truck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Manage Shipments</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6">
            <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-teal-600 to-teal-500 p-4 flex">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                  <Package className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold text-white flex items-center">
                  Create Shipment
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddShipment} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Medicine ID</label>
                    <input
                      type="text"
                      placeholder="Enter medicine ID"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      value={formData.medicineId}
                      onChange={(e) => setFormData({ ...formData, medicineId: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Sender Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-mono text-sm"
                      value={formData.sender}
                      onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Receiver Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all font-mono text-sm"
                      value={formData.receiver}
                      onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Tracking ID</label>
                    <input
                      type="text"
                      placeholder="Enter unique tracking ID"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                      value={formData.trackingId}
                      onChange={(e) => setFormData({ ...formData, trackingId: e.target.value })}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-lg shadow hover:shadow-lg ${
                      submitting ? "opacity-75 cursor-not-allowed" : "hover:from-teal-700 hover:to-teal-600"
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
                        <Package className="h-5 w-5 mr-2" />
                        Create
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Update Shipment Status Form */}
          <div className="lg:col-span-6">
            <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-500 p-4 flex">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                  <RefreshCw className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold text-white flex items-center">
                  Update Status
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleUpdateShipmentStatus} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Tracking ID</label>
                    <input
                      type="text"
                      placeholder="Enter tracking ID to update"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      value={updateData.trackingId}
                      onChange={(e) => setUpdateData({ ...updateData, trackingId: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">New Status</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                      value={updateData.status}
                      onChange={(e) => setUpdateData({ ...updateData, status: e.target.value })}
                      required
                    >
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="InTransit">In-Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-amber-600 to-amber-500 text-white rounded-lg shadow hover:shadow-lg ${
                      updating ? "opacity-75 cursor-not-allowed" : "hover:from-amber-700 hover:to-amber-600"
                    } transition-all duration-300 mt-6`}
                    disabled={updating}
                  >
                    {updating ? (
                      <>
                        <Loader className="animate-spin h-5 w-5 mr-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="h-5 w-5 mr-2" />
                        Update
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Shipments List - Full Width */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-3 text-teal-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Shipments Registry</h3>
                  </div>
                  <span className="bg-teal-100 text-teal-800 text-xs font-medium px-3 py-1 rounded-full">
                    {shipments.length} Shipments
                  </span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-10 w-10 text-teal-500 animate-spin mb-4" />
                  <p className="text-gray-600">Loading shipments...</p>
                </div>
              ) : shipments.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="bg-teal-50 rounded-lg p-6 inline-block mb-4">
                    <Truck className="h-12 w-12 text-teal-400 mx-auto" />
                  </div>
                  <p className="text-gray-500">No shipments created yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Create your first shipment using the form above.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {shipments.map((shipment) => (
                    <li key={shipment.trackingId} className="p-6 hover:bg-gray-50 transition-all">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div className="flex items-center mb-3 md:mb-0">
                          <Package className="h-5 w-5 text-teal-500 mr-2" />
                          <h4 className="font-medium text-gray-900">Medicine ID: {shipment.medicineId}</h4>
                          <div className="ml-3">{getStatusBadge(shipment.status)}</div>
                        </div>
                        <div className="flex items-center text-sm bg-gray-100 px-3 py-1 rounded">
                          <Tag className="h-4 w-4 mr-1 text-gray-700" />
                          <span className="font-mono text-gray-700">#{shipment.trackingId}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center text-gray-700 mb-1">
                            <User className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="font-medium">Sender</span>
                          </div>
                          <div className="font-mono text-gray-600 break-all text-xs">
                            {shipment.sender}
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center text-gray-700 mb-1">
                            <User className="h-4 w-4 mr-1 text-gray-500" />
                            <span className="font-medium">Receiver</span>
                          </div>
                          <div className="font-mono text-gray-600 break-all text-xs">
                            {shipment.receiver}
                          </div>
                        </div>
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

export default Shipments;