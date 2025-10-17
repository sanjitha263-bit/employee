import { FaUsers, FaCalendarAlt, FaEnvelope, FaTachometerAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-100 border-r">
      <div className="text-2xl font-bold text-blue-600 px-6 py-4 border-b">
        RS–TECH
      </div>

      <nav className="flex flex-col mt-4">
        <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" active={false} />
        <SidebarItem icon={<FaUsers />} label="Employee" active={true} />
        <SidebarItem icon={<FaCalendarAlt />} label="Calendar" active={false} />
        <SidebarItem icon={<FaEnvelope />} label="Messages" active={false} />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, active }) => {
  return (
    <div
      className={`flex items-center px-6 py-3 cursor-pointer ${
        active ? "bg-blue-600 text-white rounded-l-full" : "text-gray-700 hover:bg-gray-200"
      }`}
    >
      <span className="mr-3 text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
};

export default Sidebar;
