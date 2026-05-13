import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import LearnMorePage from './pages/LearnMorePage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/learn-more" element={<LearnMorePage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
