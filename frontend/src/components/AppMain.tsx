import Footer from "./Footer";
import Settings from "./Settings";
import Profile from "./Profile";
import type { DbProfile } from "./ApplicationPage";

export type AppView = "home" | "profile" | "settings" | "creator-loading" | "creator-not-found";

export default function AppMain({ appView, myDbProfile, creatorUserName }: { appView: AppView; myDbProfile: DbProfile | null; creatorUserName?: string }) {
import HomePage from "./HomePage";
import type { DbProfile } from "./ApplicationPage";

export type AppView = "home" | "profile" | "settings";

export default function AppMain({ appView, currentUserDbProfile, setAppView, profileCreatorId }: { appView: AppView; currentUserDbProfile: DbProfile | null; setAppView: (view: AppView, creatorId?: string) => void; profileCreatorId?: string }) {
  return (
    <div className="app-main">
      <div className="app-main-shell">
        <div className="app-main-view">
          {appView === "home" && (
            myDbProfile ? (
              <div>
                <h2>{myDbProfile.user_display_name ?? myDbProfile.user_name}</h2>
                <p><strong>Bio:</strong> {myDbProfile.bio}</p>
                <p><strong>Joined:</strong> {new Date(myDbProfile.created_at).toLocaleDateString()}</p>
                <p><strong>ID:</strong> {myDbProfile.id}</p>
              </div>
            ) : (
              <div>Loading profile...</div>
            )
          )}
          {appView === "profile" && <Profile creatorUserName={creatorUserName} />}
          {appView === "settings" && <Settings />}
          {appView === "creator-loading" && <div>Loading creator profile...</div>}
          {appView === "creator-not-found" && <div><h2>Creator Not Found</h2><p>We could not find this creator profile.</p></div>}
          {appView === "home" && <HomePage setAppView={setAppView} />}
          {appView === "settings" && <Settings />}
          {appView === "profile" && <Profile creatorUUID={profileCreatorId ?? currentUserDbProfile?.id} />}
        </div>
        <Footer />
      </div>
    </div>
  );
}
