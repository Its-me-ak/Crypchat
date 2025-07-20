import { Navigate } from "react-router";

const ProtectedRoute = ({ authUser, children }) => {
  if (!authUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
