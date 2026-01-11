import { useState, useEffect } from "react";
import { addParticipant, getAllParticipants } from "../services/api";
import { Users, User, MapPin, ChevronsRight, CheckCircle, AlertCircle, Loader } from "lucide-react";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: "", message: "" });
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    location: "",
    address: "",
  });

  useEffect(() => {
    fetchParticipants();
  }, []);

  const fetchParticipants = async () => {
    try {
      setLoading(true);
      const response = await getAllParticipants();
      setParticipants(response.data);
    } catch (error) {
      showNotification("error", "Error fetching participants");
      console.error("Error fetching participants:", error);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => setNotification({ show: false, type: "", message: "" }), 5000);
  };

  const handleAddParticipant = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      await addParticipant(formData);
      showNotification("success", "Participant added successfully!");
      fetchParticipants();
      setFormData({
        name: "",
        role: "",
        location: "",
        address: "",
      });
    } catch (error) {
      showNotification("error", "Error adding participant");
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      "Supplier": "bg-green-100 text-green-800",
      "Manufacturer": "bg-blue-100 text-blue-800",
      "Distributor": "bg-purple-100 text-purple-800",
      "Retailer": "bg-yellow-100 text-yellow-800"
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[role] || "bg-gray-100 text-gray-800"}`}>
        {role}
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
          <div className="bg-gradient-to-r from-purple-600 to-purple-500 p-3 rounded-lg mr-4 shadow-md">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Manage Participants</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Participant Form */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 flex to-purple-500 p-4">
                <div className="bg-white bg-opacity-20 p-2 rounded-lg mr-4">
                  <User className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-2xl font-semibold text-white flex items-center">
                  Add Participant
                </h3>
              </div>
              <div className="p-6">
                <form onSubmit={handleAddParticipant} className="space-y-5">
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Name</label>
                    <input
                      type="text"
                      placeholder="Enter participant name"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Role</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    >
                      <option value="">Select Role</option>
                      <option value="Supplier">Supplier</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Retailer">Retailer</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Location</label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-300">Ethereum Address</label>
                    <input
                      type="text"
                      placeholder="0x..."
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all font-mono text-sm"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`w-full flex justify-center items-center py-2 px-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg shadow hover:shadow-lg ${
                      submitting ? "opacity-75 cursor-not-allowed" : "hover:from-purple-700 hover:to-purple-600"
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
                        <User className="h-5 w-5 mr-2" />
                        Add
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Participants List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-3 text-purple-500" />
                    <h3 className="text-xl font-semibold text-gray-800">Participants Registry</h3>
                  </div>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                    {participants.length} Registered
                  </span>
                </div>
              </div>
              
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader className="h-10 w-10 text-purple-500 animate-spin mb-4" />
                  <p className="text-gray-600">Loading participants...</p>
                </div>
              ) : participants.length === 0 ? (
                <div className="p-6 text-center">
                  <div className="bg-purple-50 rounded-lg p-6 inline-block mb-4">
                    <Users className="h-12 w-12 text-purple-400 mx-auto" />
                  </div>
                  <p className="text-gray-500">No participants registered yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Add your first participant using the form.</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {participants.map((participant) => (
                    <li key={participant.address} className="p-6 hover:bg-gray-50 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                        <div className="mb-3 sm:mb-0">
                          <div className="flex items-center">
                            <h4 className="font-medium text-gray-900">{participant.name}</h4>
                            <div className="ml-3">{getRoleBadge(participant.role)}</div>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                          {participant.location}
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded px-3 py-2 font-mono text-xs text-gray-600 break-all">
                        {participant.address}
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

export default Participants;