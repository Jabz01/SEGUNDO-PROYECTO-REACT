import { Routes, Route, Navigate } from "react-router-dom";

import RtlLayout from "layouts/rtl";
import AdminLayout from "layouts/admin";
import AuthLayout from "layouts/auth";
import { AuthProvider, useAuth } from "context/AuthProvider";
import { ProtectedRoute } from "guards/ProtectedRoute";
import { PublicRoute } from "guards/PublicRoute";

const App = () => {

  return (
    <AuthProvider>
      <Routes>
        <Route path="auth/*" element={<PublicRoute> <AuthLayout /> </PublicRoute> } />
        <Route path="admin/*" element={<ProtectedRoute> <AdminLayout /> </ProtectedRoute>} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
