import Footer from "./Footer";
import Profile from "./Profile";

export default function AppMain({appView}: {appView: string}) {
  return (
    <div className="app-main">
      <div className="app-main-shell">
        <div className="app-main-view">
          {appView === "home" && <div>Home Feed - Coming Soon!</div>}
          {appView === "profile" && <Profile />}
          {appView === "settings" && <div>Settings Page - Coming Soon!</div>}
        </div>
        <Footer />
      </div>
    </div>
  );
}