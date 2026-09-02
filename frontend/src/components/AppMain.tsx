import Footer from "./Footer";
import Settings from "./Settings";
import Profile from "./Profile";
import HomePage from "./HomePage";
import type { DbProfile } from "./ApplicationPage";

export type AppView = "home" | "profile" | "settings";

export default function AppMain({ appView, currentUserDbProfile, setAppView, profileCreatorId }: { appView: AppView; currentUserDbProfile: DbProfile | null; setAppView: (view: AppView, creatorId?: string) => void; profileCreatorId?: string }) {
  return (
    <div className="app-main">
      <div className="app-main-shell">
        <div className="app-main-view">
          {appView === "home" && <HomePage setAppView={setAppView} />}
          {appView === "settings" && <Settings />}
          {appView === "profile" && <Profile creatorUUID={profileCreatorId ?? currentUserDbProfile?.id} />}
        </div>
        <Footer />
      </div>
    </div>
  );
}