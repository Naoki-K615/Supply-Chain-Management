import { Link } from "react-router-dom";
import image from '../assets/home.jpg';

const Home = () => {
  return (
    <div className="min-h-screen" style={{ 
      backgroundImage: `linear-gradient(to right bottom, rgba(0, 0, 30, 0.85), rgba(0, 0, 0, 0.9)), url(${image})`, 
      backgroundRepeat: "no-repeat", 
      backgroundPosition: "center",
      backgroundSize: "cover" 
    }}>
      <div className="min-h-screen py-16 px-6 container mx-auto flex flex-col justify-center items-center">
        <div className="max-w-4xl w-full">
          <div className="mb-16 relative">
            <h1 className="text-5xl md:text-6xl text-white font-bold mb-6 tracking-tight -z-10">
              Blockchain Supply Chain <span className="text-blue-400">Management</span>
            </h1>
            <div className="h-1 w-24 bg-blue-500 mb-8"></div>
            <p className="text-xl text-gray-300 max-w-2xl">
              Track medicines from manufacturing to distribution using secure blockchain technology for enhanced transparency and trust.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Link to="/add-medicine" className="group bg-gradient-to-r from-blue-600 to-blue-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-white font-medium text-lg">Add Medicine</span>
              </div>
            </Link>

            <Link to="/medicines" className="group bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-white font-medium text-lg">Medicine List</span>
              </div>
            </Link>

            <Link to="/medicine-details" className="group bg-gradient-to-r from-teal-600 to-teal-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z" />
                </svg>
                <span className="text-white font-medium text-lg">Medicine Details</span>
              </div>
            </Link>

            <Link to="/participants" className="group bg-gradient-to-r from-purple-600 to-purple-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-white font-medium text-lg">Participants</span>
              </div>
            </Link>

            <Link to="/transactions" className="group bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <span className="text-white font-medium text-lg">Transactions</span>
              </div>
            </Link>

            <Link to="/shipments" className="group bg-gradient-to-r from-red-600 to-red-500 p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="text-white font-medium text-lg">Shipments</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;