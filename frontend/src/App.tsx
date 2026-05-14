import ApplicationPage from "./components/ApplicationPage";
import LandingPage from "./components/LandingPage";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/app" element={<ApplicationPage />} />
          <Route path='/other' element={<h1>Other Page</h1>} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<h1>404 Not Found hoo </h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

/*

function OnlineStatus(status: "online" | "offline"): string {
  return `
    <span class="status-indicator ${status}">${status}</span>`;
}

function ProfileConents(): string {
  return `
    <div id="profile-main">
      <div id="profile-main-header" class="level-one-card">
        <div id="profile-main-header-contents">
          <div id="profile-main-avatar-container">
            <img id="profile-main-avatar" src="${profileAvatar}" alt='profile avatar'>
          </div>
          <div id="profile-user-info">
              <p class="body-style">Emily</p>
              <p class="body-style">Username: @emily_gamer</p>
              <div>
                <p class="body-style">Boston, MA, 14:00 UTC</p>
                ${OnlineStatus("online")}
                ${OnlineStatus("offline")}
              </div>
          </div>
          <div id="profile-user-cta">
            <button>Book a Session</button>
            <button>Follow</button>
            <button>Message</button>
          </div>
        </div>
        <div id="profile-tabs-toggle">
          button overview
          button games
          button reviews
        </div>
      </div>
      <div id="profile-main-content" class="level-one-card">main content will go here...</div>
    </div>
    <div id="profile-aside">
      <div id="profile-aside-donation" class="level-one-card">
        <p class="body-style">Support Emily</p>
        <p class="body-style">Love Emily's Content? Support her directly!</p>
        <div id="profile-aside-donation-grid">
          <div>$5</div>
          <div>$10</div>
          <div>$15</div>
          <div>$20</div>
          <div>$50</div>
          <div>$100</div>
        </div>
        <button class="donate-button">Donate</button>
      </div>
      <div id="profile-aside-ads">ads will go here...</div>
    </div>
    `;
}

function Footer(): string {
  return `
    <footer>
      <div>© Konevo 2026</div>
      <div> terms of service | privacy policy </div>
    </footer>`;
}

function applyCtaButtonMaxWidth(): void {
  const ctaContainer = document.getElementById("profile-user-cta");
  if (!ctaContainer) return;

  const buttons = ctaContainer.querySelectorAll("button");
  if (!buttons.length) return;

  const maxCharacters = Math.max(
    ...Array.from(buttons, (button) => button.textContent?.trim().length ?? 0),
  );

  ctaContainer.style.setProperty("--cta-max-ch", String(maxCharacters));
}

function InitLandingPage(): void {
  const nav = document.getElementById("nav-bar") as HTMLElement;
  const app = document.getElementById("app") as HTMLElement;
  if (!nav || !app) return;
  nav.innerHTML = NavBar();
  app.innerHTML = `
    <div class="main"></div>
    ${Footer()}`;
  document.getElementsByClassName("main")[0].innerHTML = ProfileConents();
  applyCtaButtonMaxWidth();
}

InitLandingPage();

*/