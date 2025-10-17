import { FaBell, FaCog } from "react-icons/fa";

const Header = () => {
  return (
    <header className="w-full h-16 bg-white flex justify-between items-center px-6 border-b">
      {/* Left side (can be empty or show title) */}
      <div></div>

      {/* Right side icons */}
      <div className="flex items-center space-x-4">
        <button className="text-gray-600 hover:text-blue-600 transition">
          <FaCog className="text-xl" />
        </button>
        <button className="text-gray-600 hover:text-blue-600 transition">
          <FaBell className="text-xl" />
        </button>
        <img
          src="https://i.pravatar.cc/40" // sample avatar
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
