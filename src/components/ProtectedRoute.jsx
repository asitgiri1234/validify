import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import PageLoader from './PageLoader.jsx';

export default function ProtectedRoute({ children }) {
  const { status } = useAuth();
  const location = useLocation();

  if (status === 'loading') {
    return <PageLoader label="Checking your session…" />;
  }

  if (status !== 'authenticated') {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
