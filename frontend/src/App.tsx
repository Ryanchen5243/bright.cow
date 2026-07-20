import ApplicationPage from "./components/ApplicationPage";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import BookingPage from "./components/BookingPage";
import PaymentConfirmationPage from "./components/PaymentConfirmationPage";
import { type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/authContext";
import TermsPage from "./components/TermsPage";

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { currentUser, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <div className="auth-route-loading" role="status">Loading your booking…</div>;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }: { children: ReactElement }) {
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Navigate to="/app" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/app" element={<ProtectedRoute><ApplicationPage /></ProtectedRoute>} />
              <Route path="/app/profile/:creatorUserName" element={<ProtectedRoute><ApplicationPage /></ProtectedRoute>} />
              <Route path='/booking' element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path='/booking/confirmation' element={<ProtectedRoute><PaymentConfirmationPage /></ProtectedRoute>} />
              <Route path='/other' element={<h1>Other Page</h1>} />
              <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path='/terms' element={<TermsPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<h1>404 Not Found hoo </h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
