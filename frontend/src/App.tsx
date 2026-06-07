import ApplicationPage from "./components/ApplicationPage";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import BookingPage from "./components/BookingPage";
import { type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/authContext";

function AuthLoading() {
  return <h1>Loading...</h1>;
}

function ProtectedRoute({ children }: { children: ReactElement }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function PublicOnlyRoute({ children }: { children: ReactElement }) {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

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
              <Route path="/app/profile/:creatorId" element={<ProtectedRoute><ApplicationPage /></ProtectedRoute>} />
              <Route path='/booking' element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path='/other' element={<h1>Other Page</h1>} />
              <Route path='/login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<h1>404 Not Found hoo </h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}