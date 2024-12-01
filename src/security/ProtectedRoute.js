import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./auth"; // tokenni tekshirish funksiyasi

const ProtectedRoute = ({ token }) => {
  return isTokenValid(token) ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
