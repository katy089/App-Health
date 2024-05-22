import { Navigate, Outlet, useLocation } from "react-router-dom";
import useToken from "../hooks/useToken";

const RequireAuth = ({ authRoles }) => {
  const location = useLocation();
  const { role } = useToken("health_link_user_token");

  return authRoles.find((authRole) => authRole === role) ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
