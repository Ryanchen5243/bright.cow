const footerLinks = ['Terms', 'Privacy', 'Support', 'Creators', 'Contact'];

export default function Footer() {
  return (
    <footer className="app-footer" aria-label="Site footer">
      <div className="app-footer-shell">
        <p className="app-footer-brand">Konevo LLC 2026</p>
        <div className="app-footer-links" aria-label="Footer links">
          {footerLinks.map((link) => (
            <a key={link} href="#" className="app-footer-link">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}