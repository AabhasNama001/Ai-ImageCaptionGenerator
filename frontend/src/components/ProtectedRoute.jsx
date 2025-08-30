import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }
  return children;
}
