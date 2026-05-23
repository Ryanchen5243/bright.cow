import Profile from "./Profile"

export default function AppMain({appView}: {appView: string}) {
  return (
    <>
      <div className="app-main">
        {appView === "profile" && <Profile />}
      </div>
    </>
  );
}