import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import DashboardRoutes from "./Routes/DashboardRoutes";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
