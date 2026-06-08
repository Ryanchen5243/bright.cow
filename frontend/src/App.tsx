import ApplicationPage from "./components/ApplicationPage";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import BookingPage from "./components/BookingPage";
import { type ReactElement } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from "./contexts/authContext";

function AuthLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 10% 20%, #dbeafe 0%, #eff6ff 35%, #f8fafc 100%)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "20rem",
          height: "20rem",
          borderRadius: "9999px",
          background: "rgba(14, 165, 233, 0.22)",
          filter: "blur(35px)",
          top: "-5rem",
          left: "-4rem",
          animation: "authOrbFloat 6s ease-in-out infinite",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "18rem",
          height: "18rem",
          borderRadius: "9999px",
          background: "rgba(250, 204, 21, 0.22)",
          filter: "blur(32px)",
          bottom: "-6rem",
          right: "-3rem",
          animation: "authOrbFloat 7s ease-in-out infinite reverse",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.9rem",
          width: "min(28rem, 90vw)",
          padding: "2rem",
          borderRadius: "18px",
          backgroundColor: "rgba(255, 255, 255, 0.82)",
          border: "1px solid rgba(148, 163, 184, 0.25)",
          backdropFilter: "blur(8px)",
          boxShadow: "0 24px 40px rgba(15, 23, 42, 0.12)",
        }}
      >
        <span
          style={{
            fontSize: "0.72rem",
            letterSpacing: "0.14em",
            fontWeight: 700,
            color: "#0369a1",
            textTransform: "uppercase",
            padding: "0.35rem 0.7rem",
            borderRadius: "9999px",
            background: "rgba(14, 165, 233, 0.12)",
          }}
        >
          CreatorOS
        </span>
        <div
          aria-hidden="true"
          style={{
            width: "2.4rem",
            height: "2.4rem",
            border: "3px solid #bfdbfe",
            borderTopColor: "#0284c7",
            borderRadius: "9999px",
            animation: "authLoadingSpin 0.85s linear infinite",
          }}
        />
        <h2
          style={{
            margin: 0,
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#0f172a",
            letterSpacing: "0.01em",
          }}
        >
          Warming up your workspace
        </h2>
        <p
          style={{
            margin: 0,
            fontSize: "0.95rem",
            fontWeight: 500,
            color: "#475569",
            textAlign: "center",
          }}
        >
          Verifying your account and loading your creator dashboard...
        </p>
      </div>
      <style>{`
        @keyframes authLoadingSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes authOrbFloat {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(14px) translateX(8px); }
        }
      `}</style>
    </div>
  );
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

  if (loading && currentUser) {
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