import { useState, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cookie] = useCookies(["user"]);
  // console.log("here is the cookie ", cookie.user);

  // Update isAuthenticated when the auth object changes
  useEffect(() => {
    setIsAuthenticated(Boolean(auth?.user));
  }, [auth]);

  // const hasAllowedRole = auth?.userRole && allowedRoles?.includes(auth?.userRole);
  const hasAllowedRole = cookie.user && allowedRoles?.includes(cookie.user);
  // console.log("auth:", auth);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("hasAllowedRole:", hasAllowedRole); 
  return (
    cookie.user
        ? <Outlet />
        : auth?.user
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
);
};

export default RequireAuth;
