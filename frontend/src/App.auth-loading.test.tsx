import { render, screen } from "@testing-library/react";
import App from "./App";

type MockAuthState = {
  currentUser: { uid: string } | null;
  loading: boolean;
};

const mockAuthState: MockAuthState = {
  currentUser: null,
  loading: false,
};

vi.mock("./components/ApplicationPage", () => ({
  default: () => <div>Application Page</div>,
}));

vi.mock("./components/LandingPage", () => ({
  default: () => <div>Landing Page</div>,
}));

vi.mock("./components/Login", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("./components/BookingPage", () => ({
  default: () => <div>Booking Page</div>,
}));

vi.mock("./contexts/authContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useAuth: () => mockAuthState,
}));

function renderAt(pathname: string, state: MockAuthState) {
  mockAuthState.currentUser = state.currentUser;
  mockAuthState.loading = state.loading;
  window.history.pushState({}, "", pathname);
  return render(<App />);
}

describe("Auth loading route behavior", () => {
  beforeEach(() => {
    mockAuthState.currentUser = null;
    mockAuthState.loading = false;
    window.history.pushState({}, "", "/");
  });

  it("does not show auth loading before login prompt on public login route", () => {
    renderAt("/login", {
      currentUser: null,
      loading: true,
    });

    expect(screen.queryByText("Warming up your workspace")).not.toBeInTheDocument();
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  it("shows auth loading when authenticated user refreshes protected route", () => {
    renderAt("/app", {
      currentUser: { uid: "u1" },
      loading: true,
    });

    expect(screen.getByText("Warming up your workspace")).toBeInTheDocument();
  });

  it("shows auth loading after successful login transition while user is authenticated", () => {
    renderAt("/login", {
      currentUser: { uid: "u1" },
      loading: true,
    });

    expect(screen.getByText("Warming up your workspace")).toBeInTheDocument();
  });
});
