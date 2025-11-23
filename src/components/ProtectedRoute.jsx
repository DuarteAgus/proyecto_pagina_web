import { useAuth } from '@contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { is_logueado, user } = useAuth();

  if (!is_logueado) {
    return <Navigate to="/login-cliente" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const role = user?.role;

    if (!role || !allowedRoles.includes(role)) {
      if (role === 'admin') return <Navigate to="/dashboard-admin" replace />;
      if (role === 'cliente')
        return <Navigate to="/dashboard-cliente" replace />;
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
