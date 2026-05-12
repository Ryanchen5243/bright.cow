export default function LandingMain({appView}: {appView: string}) {
  return (
    <div className="landing-main">
      {appView === "home" && <h1>Home View</h1>}
      {appView === "messages" && <h1>Messages View</h1>}
      {appView === "following" && <h1>Following View</h1>}
      {appView === "games" && <h1>Games View</h1>}
      {appView === "bookings" && <h1>Bookings View</h1>}
      {appView === "settings" && <h1>Settings View</h1>}
    </div>
  );
}
