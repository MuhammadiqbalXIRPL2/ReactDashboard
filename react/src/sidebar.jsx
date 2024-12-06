import { Route, BrowserRouter as Router, Routes, Link } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./components/dashboard";
import Table from "./Page/table";
import Login from "./Page/login";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <div className="flex min-h-screen">
        <aside
          id="default-sidebar"
          className={`fixed top-0 left-0 z-40 h-screen w-64 transition-transform bg-gray-800 text-white 
            ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Monitoring Dashboard</h2>
              <button
                className="sm:hidden text-white"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to="/"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
                >
                  <span className="ml-3">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/table"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
                >
                  <span className="ml-3">Table</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="flex items-center p-2 hover:bg-gray-700 rounded-lg"
                >
                  <span className="ml-3">Sign In</span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        <div
          className={`flex-1 transition-all ${
            isOpen ? "ml-64" : "ml-0"
          } sm:ml-64`}
        >
          <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <button
              className="sm:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle Sidebar"
            >
              ☰
            </button>
            <h1 className="text-lg"></h1>
          </div>

          <div className="p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/table" element={<Table />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Sidebar;
