import { useEffect, useState } from "react";
import { getMedicines } from "../services/api";
import { PackageSearch, AlertCircle, Pill, ChevronRight, Loader } from "lucide-react";

const MedicineList = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await getMedicines();
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
        setError("Failed to load medicines. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  const getStageColor = (stage) => {
    const stageColors = {
      "Ordered": "bg-yellow-100 text-yellow-800",
      "RawMaterialSupplied": "bg-blue-100 text-blue-800",
      "Manufactured": "bg-purple-100 text-purple-800",
      "Distributed": "bg-green-100 text-green-800",
      "Retail": "bg-indigo-100 text-indigo-800",
      "Sold": "bg-gray-100 text-gray-800"
    };
    return stageColors[stage] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-800 py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <div className="bg-gradient-to-r from-green-600 to-green-500 p-3 rounded-lg mr-4 shadow-md">
            <PackageSearch className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white">Medicine List</h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader className="h-10 w-10 text-green-500 animate-spin mb-4" />
            <p className="text-gray-600">Loading medicines...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-red-500 mr-4" />
            <p className="text-red-700">{error}</p>
          </div>
        ) : medicines.length === 0 ? (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 flex items-center">
            <AlertCircle className="h-8 w-8 text-blue-500 mr-4" />
            <p className="text-blue-700">No medicines found in the blockchain.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {medicines.map((medicine) => (
              <div key={medicine._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all">
                <div className="border-b border-gray-100 p-4 flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Pill className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg text-black flex-grow">{medicine.name}</h3>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getStageColor(medicine.stage)}`}>
                    {medicine.stage}
                  </span>
                </div>
                
                <div className="p-4">
                  <div className="mb-3">
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="text-gray-700">{medicine.description}</p>
                  </div>
                  
                  <button className="w-full mt-3 flex items-center justify-center text-green-600 hover:text-green-700 text-sm font-medium">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineList;