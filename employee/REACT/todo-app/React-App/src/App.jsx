import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeAdd from "./components/Employeeadd";
import Header from "./components/Header";
import EmployeeDetails from "./components/EmployeeDetails";
import EditEmployeeDetails from "./components/EditEmployeeDetails";
// optionally add other pages
// import Calendar from "./pages/Calendar";
// import Messages from "./pages/Messages";

function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 flex flex-col min-h-screen bg-white">
          {/* Header */}
          <Header />
          

        {/* Main Content */}
        <div className="flex-1 bg-white p-6 min-h-screen">
          <Routes>
            <Route path="/" element={<EmployeeTable />} />
            <Route path="/employee" element={<EmployeeTable />} />
            <Route path="/add-employee" element={<EmployeeAdd />} />
          
             <Route path="/EmployeeDetails/:id" element={<EmployeeDetails />} />
             <Route path="/edit-employee/:id" element={<EditEmployeeDetails />} />

            {/* Add more routes if needed */}
            {/* <Route path="/calendar" element={<Calendar />} /> */}
            {/* <Route path="/messages" element={<Messages />} /> */}
          </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
