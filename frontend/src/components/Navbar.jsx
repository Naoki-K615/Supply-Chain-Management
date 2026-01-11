import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Clipboard, List, FileSearch, Users, BarChart2, Truck } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="flex items-center group">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
            SCM
          </span>
        </Link>

        <button 
          className="lg:hidden focus:outline-none rounded-full p-2 hover:bg-gray-800 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <div className="hidden lg:flex items-center space-x-1">
          <NavLink to="/add-medicine" icon={<Clipboard className="w-4 h-4 mr-2" />} text="Add Medicine" />
          <NavLink to="/medicines" icon={<List className="w-4 h-4 mr-2" />} text="Medicine List" />
          <NavLink to="/medicine-details" icon={<FileSearch className="w-4 h-4 mr-2" />} text="Details" />
          <NavLink to="/participants" icon={<Users className="w-4 h-4 mr-2" />} text="Participants" />
          <NavLink to="/transactions" icon={<BarChart2 className="w-4 h-4 mr-2" />} text="Transactions" />
          <NavLink to="/shipments" icon={<Truck className="w-4 h-4 mr-2" />} text="Shipments" />
        </div>

        {isOpen && (
          <div className="absolute top-16 right-4 bg-gray-900 border border-gray-800 shadow-xl rounded-lg py-2 w-56 flex flex-col overflow-hidden z-10">
            <MobileNavLink to="/add-medicine" icon={<Clipboard className="w-5 h-5" />} text="Add Medicine" />
            <MobileNavLink to="/medicines" icon={<List className="w-5 h-5" />} text="Medicine List" />
            <MobileNavLink to="/medicine-details" icon={<FileSearch className="w-5 h-5" />} text="Medicine Details" />
            <MobileNavLink to="/participants" icon={<Users className="w-5 h-5" />} text="Participants" />
            <MobileNavLink to="/transactions" icon={<BarChart2 className="w-5 h-5" />} text="Transactions" />
            <MobileNavLink to="/shipments" icon={<Truck className="w-5 h-5" />} text="Shipments" />
          </div>
        )}
      </div>
    </nav>
  );
};

// Desktop navigation link component
const NavLink = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-all"
  >
    {icon}
    <span>{text}</span>
  </Link>
);

// Mobile navigation link component
const MobileNavLink = ({ to, icon, text }) => (
  <Link 
    to={to} 
    className="flex items-center px-4 py-3 hover:bg-gray-800 text-gray-300 hover:text-blue-400 transition-all"
    onClick={() => setIsOpen(false)}
  >
    <span className="mr-3 text-blue-500">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default Navbar;