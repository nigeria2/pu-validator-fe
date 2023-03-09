import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUserData } from "../store/features/auth/authSlice";

const ProtectedRoute = ({ redirectPath = "/login", children }) => {
  const user = useSelector(selectUserData);
  if (Object.keys(user).length === 0) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
