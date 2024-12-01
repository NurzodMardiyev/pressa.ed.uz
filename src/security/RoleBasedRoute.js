import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "./auth";

const RoleBasedRoute = ({ allowedRole, userRole, token }) => {
  // Agar foydalanuvchi roli allowedRole bilan mos kelmasa, "/" sahifasiga qaytariladi
  // isTokenValid(token) ? <Outlet /> : <Navigate to="/" />;
  return userRole === allowedRole || isTokenValid(token) ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default RoleBasedRoute;
