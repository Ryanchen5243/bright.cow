import Footer from "./Footer";
import Profile from "./Profile";

export type AppView = "home" | "profile" | "settings" | "creator-loading" | "creator-not-found";

export default function AppMain({appView, creatorUserName}: {appView: AppView, creatorUserName?: string}) {
  return (
    <div className="app-main">
      <div className="app-main-shell">
        <div className="app-main-view">
          {appView === "home" && <div>Home Feed - Coming Soon!</div>}
          {appView === "profile" && <Profile creatorUserName={creatorUserName} />}
          {appView === "settings" && <div>Settings Page - Coming Soon!</div>}
          {appView === "creator-loading" && <div>Loading creator profile...</div>}
          {appView === "creator-not-found" && (
            <div>
              <h2>Creator Not Found</h2>
              <p>We could not find a profile for this creator id.</p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}