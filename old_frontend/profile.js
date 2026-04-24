const DONATE_TAB = 0;
const SUBSCRIBE_TAB = 1;

document.addEventListener('DOMContentLoaded', () => {
    const supportTabs = document.querySelectorAll('.support-tab');
    const supportContents = document.getElementById('profile-sidebar-support-contents');
    supportTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const index = parseInt(tab.dataset.index);
            supportTabs.forEach(t => t.setAttribute('aria-selected', 'false'));
            tab.setAttribute('aria-selected', 'true');
            if (index === DONATE_TAB) {
                supportContents.innerHTML = `
                    <p>Donate to Emily via PayPal:</p>
                    <a href="https://www.paypal.com/donate?hosted_button_id=EXAMPLE" target="_blank" class="donate-link">Donate with PayPal</a>
                `;
            } else if (index === SUBSCRIBE_TAB) {
                supportContents.innerHTML = `
                    <p>Subscribe to Emily's Patreon for exclusive content:</p>
                    <a href="https://www.patreon.com/emily" target="_blank" class="subscribe-link">Subscribe on Patreon</a>
                `;
            }       });
    });
});