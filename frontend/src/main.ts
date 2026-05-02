import "../src/style.css";

function InitNavBar(): void {
  const nav = document.getElementById("nav-bar") as HTMLElement;
  nav.innerHTML += `<div>
        <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="kGradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#5B8CFF"/>
              <stop offset="100%" stop-color="#9B5CFF"/>
            </linearGradient>
          </defs>
          <rect x="6" y="6" width="8" height="36" rx="4" fill="url(#kGradient)"/>
          <path d="M16 24 L34 6 C36 4 40 6 38 10 L22 26 Z" fill="url(#kGradient)"/>
          <path d="M16 24 L34 42 C36 44 40 42 38 38 L22 22 Z" fill="url(#kGradient)"/>
          <circle cx="38" cy="38" r="4" fill="url(#kGradient)"/>
        </svg>
        <h2 class="h2-style">Konevo</h2>
      </div>`;
  nav.innerHTML += `<div>
    <div><input type='text' placeholder='Search...'></div>
    <div><svg width='32' height='32' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'><circle cx='24' cy='24' r='12' fill='url(#kGradient)'/></svg></div>
    </div>`;
}

function InitLandingPage(): void {
  const container = document.getElementById("app") as HTMLElement;
  container.innerHTML += `
          <div class="main">
            <h1 class="h1-style">This is an H1</h1>
            <h2 class="h2-style">This is an H2</h2>
            <h3 class="h3-style">This is an H3</h3>
            <p class="body-style">This is a paragraph.</p>
            <h1 class="h1-style">fpasodfi</h1>
          </div>
        <footer>
          <div>© Konevo 2026</div>
          <div>
            terms of service | privacy policy
          </div>
        </footer>
  `;
}

InitNavBar();
InitLandingPage();