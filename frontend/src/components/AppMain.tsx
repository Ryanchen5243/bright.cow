import Profile from "./Profile"
import RightAside from "./RightAside"

export default function AppMain({appView}: {appView: string}) {
  return (
    <>
      <div className="app-main">
        {appView === "home" && <h1>Home View</h1>}
        {appView === "messages" && <h1>Messages View</h1>}
        {appView === "favorites" && <h1>Favorites View</h1>}
        {appView === "bookings" && <h1>Bookings View</h1>}
        {appView === "profile" && <Profile />}
      </div>
      <RightAside />
    </>
  );
}