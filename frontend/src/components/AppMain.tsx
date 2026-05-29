import Profile from "./Profile"

export default function AppMain({appView}: {appView: string}) {
  return (
    <>
      <div className="app-main">
        {appView === "home" && <div>Home Feed - Coming Soon!</div>}
        {appView === "profile" && <Profile />}
        {appView === "settings" && <div>Settings Page - Coming Soon!</div>}
      </div>
    </>
  );
}