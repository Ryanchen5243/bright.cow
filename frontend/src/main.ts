import "../src/style.css";

function NavBar(): string {
  return `
    <div><h2 class="h2-style">LobbyNest</h2></div>
    <div>
      <div><input id="search-input" type='text' placeholder='Search games...'></div>
      <div><img id="messages-icon" src='src\\assets\\lucide-message-circle-more.svg' alt='messages'></div>
      <div><img id="profile-avatar" src='src\\assets\\profile-avatar.svg' alt='profile avatar'></div>
    </div>
  `;
}

function ProfileConents(): string {
  return `
    <div id="profile-main">
    hello 
    </div>
    <div id="profile-aside">
      <div id="profile-aside-donation">
        <p class="body-style">Support Emily</p>
        <p class="body-style">Love Emily's Content? Support her directly!</p>
        <div id="profile-aside-donation-grid">
          <div>5</div>
          <div>10</div>
          <div>15</div>
          <div>20</div>
          <div>50</div>
          <div>100</div>
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

function InitLandingPage(): void {
  const nav = document.getElementById("nav-bar") as HTMLElement;
  const app = document.getElementById("app") as HTMLElement;
  if (!nav || !app) return;
  nav.innerHTML = NavBar();
  app.innerHTML = `
    <div class="main"></div>
    ${Footer()}`;
  document.getElementsByClassName("main")[0].innerHTML = ProfileConents();
}

InitLandingPage();