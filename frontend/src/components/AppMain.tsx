import Footer from "./Footer";
import Settings from "./Settings";
import type { DbProfile } from "./ApplicationPage";

export type AppView = "home" | "settings";

export default function AppMain({ appView, myDbProfile }: { appView: AppView; myDbProfile: DbProfile | null }) {
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
          {appView === "settings" && <Settings />}
        </div>
        <Footer />
      </div>
    </div>
  );
}