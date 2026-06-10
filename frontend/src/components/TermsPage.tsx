import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function TermsPage() {
    const [termsTab, setTermsTab] = useState<'terms' | 'privacy' | 'support' | 'creators' | 'contact'>('terms');
    const navigate = useNavigate();

    // <div>
    //     <div>
    //         <h1/h2/h3... etc> use like h2/h3
    //         <p>supproting context for the section led by header</p>
    //     </div> -- section
    //     <div></div> -- section
    //     <div></div> -- section
    // </div>
  return (
        <div className="terms-page">
            <div className="terms-page-tabs">
                <div className={`terms-page-tab ${termsTab === 'terms' ? 'active' : ''}`} onClick={() => setTermsTab('terms')}>Terms</div>
                <div className={`terms-page-tab ${termsTab === 'privacy' ? 'active' : ''}`} onClick={() => setTermsTab('privacy')}>Privacy</div>
                <div className={`terms-page-tab ${termsTab === 'support' ? 'active' : ''}`} onClick={() => setTermsTab('support')}>Support</div>
                <div className={`terms-page-tab ${termsTab === 'creators' ? 'active' : ''}`} onClick={() => setTermsTab('creators')}>Creators</div>
                <div className={`terms-page-tab ${termsTab === 'contact' ? 'active' : ''}`} onClick={() => setTermsTab('contact')}>Contact</div>
            </div>
            <div className="terms-page-content">
                {termsTab === 'terms' && <div className="terms-container">
                    <h1> terms</h1>
                    <div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                    </div>}
                {termsTab === 'privacy' && <div className="terms-container">
                    <h1> privacy</h1>
                    <div><p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. more stuff lorem here go here</p></div>
                    </div>}
                {termsTab === 'support' && <div className="terms-container">
                    <h1> support</h1>
                    <div>supporting content goes here</div>
                    </div>}
                {termsTab === 'creators' && <div className="terms-container">
                    <h1> creators</h1>
                    <div>supporting content goes here</div>
                    </div>}
                {termsTab === 'contact' && <div className="terms-container">
                    <h1> contact</h1>
                    <div>supporting content goes here</div>
                    </div>}
            </div>
        </div>
  );
}