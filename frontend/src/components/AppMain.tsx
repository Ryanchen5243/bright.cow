import Footer from "./Footer";
import Settings from "./Settings";
import Profile from "./Profile";
import HomePage from "./HomePage";
import type { DbProfile } from "./ApplicationPage";

export type AppView = "home" | "profile" | "settings" | "creator-loading" | "creator-not-found";

type AppMainProps = {
  appView: AppView;
  currentUserDbProfile: DbProfile | null;
  setAppView: (view: AppView, creatorId?: string) => void;
  profileCreatorId?: string;
};

export default function AppMain({ appView, currentUserDbProfile, setAppView, profileCreatorId }: AppMainProps) {
  return (
    <div className="app-main">
      <div className="app-main-shell">
        <div className="app-main-view">
          {appView === "home" && <HomePage setAppView={setAppView} />}
          {appView === "settings" && <Settings />}
          {appView === "profile" && <Profile creatorUUID={profileCreatorId ?? currentUserDbProfile?.id} />}
          {appView === "creator-loading" && <div>Loading creator profile...</div>}
          {appView === "creator-not-found" && <div><h2>Creator Not Found</h2><p>We could not find this creator profile.</p></div>}
        </div>
        <Footer />
      </div>
    </div>
  );
}
