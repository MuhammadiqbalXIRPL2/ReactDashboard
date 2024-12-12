import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Table from "./components/dashboardComponents/table";
import LoginPage from "./Page/LoginPage";
import Dashboard from "./Page/dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import IssuePage from "./Page/IssuePage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/table" element={<Table />} /> */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/issue"
          element={
            <ProtectedRoute>
              <IssuePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
