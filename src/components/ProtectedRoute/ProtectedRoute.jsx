// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  isLoggedIn,
  children,
  anonymous = false,
  isCheckingAuth,
}) {
  // If authentication is still being checked
  if (isCheckingAuth) {
    // For anonymous routes, allow rendering even while checking
    if (anonymous) {
      return children;
    }
    // For protected routes, show loading state
    return <div>Loading...</div>;
  }

  // If the route is protected and the user is not logged in, redirect to login.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Otherwise, render the protected route's child component.
  return children;
}

export default ProtectedRoute;
