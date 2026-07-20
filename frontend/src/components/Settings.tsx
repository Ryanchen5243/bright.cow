import { useState } from "react";
import { PersonOutlined, HttpsOutlined, NotificationsNoneOutlined, ShieldOutlined, WalletOutlined, LinkOutlined, CalendarMonthOutlined, LocalOfferOutlined, DateRangeOutlined, VideocamOutlined, BoltOutlined, PrivacyTipOutlined, ColorLensOutlined, LanguageOutlined } from "@mui/icons-material"
import ProfileInformation from "./ProfileInformation";
export default function Settings(props: { creatorUserName?: string }) {
    const [settingsView, setSettingsView] = useState<string>("profile-information");
    return (
        <div className="settings-container">
            <div className="settings-aside">
                <div className="settings-aside-section">
                    <h4>ACCOUNT</h4>
                    <div className="settings-aside-item profile-information" onClick={() => setSettingsView("profile-information")}>
                        <PersonOutlined />
                        <span>Profile Information</span>
                    </div>
                    <div className="settings-aside-item account-security" onClick={() => setSettingsView("account-security")}>
                        <HttpsOutlined />
                        <span>Account & Security</span>
                    </div>
                    <div className="settings-aside-item notifications" onClick={() => setSettingsView("notifications")}>
                        <NotificationsNoneOutlined />
                        <span>Notifications</span>
                    </div>
                    <div className="settings-aside-item privacy" onClick={() => setSettingsView("privacy")}>
                        <ShieldOutlined />
                        <span>Privacy</span>
                    </div>
                    <div className="settings-aside-item billing-payouts" onClick={() => setSettingsView("billing-payouts")}>
                        <WalletOutlined />
                        <span>Billing & Payouts</span>
                    </div>
                    <div className="settings-aside-item connected-accounts" onClick={() => setSettingsView("connected-accounts")}>
                        <LinkOutlined />
                        <span>Connected Accounts</span>
                    </div>
                </div>
                <div className="settings-aside-section">
                    <h4>CREATOR TOOLS</h4>
                    <div className="settings-aside-item availability" onClick={() => setSettingsView("availability")}>
                        <CalendarMonthOutlined />
                        <span>Availability</span>
                    </div>
                    <div className="settings-aside-item services-pricing" onClick={() => setSettingsView("services-pricing")}   >
                        <LocalOfferOutlined />
                        <span>Services & Pricing</span>
                    </div>
                    <div className="settings-aside-item bookings" onClick={() => setSettingsView("bookings")}>
                        <DateRangeOutlined />
                        <span>Bookings</span>
                    </div>
                    <div className="settings-aside-item sessions" onClick={() => setSettingsView("sessions")}>
                        <VideocamOutlined />
                        <span>Sessions</span>
                    </div>
                    <div className="settings-aside-item automations" onClick={() => setSettingsView("automations")}>
                        <BoltOutlined />
                        <span>Automations</span>
                    </div>
                    <div className="settings-aside-item moderation" onClick={() => setSettingsView("moderation")}>
                        <PrivacyTipOutlined />
                        <span>Moderation</span>
                    </div>
                </div>
                <div className="settings-aside-section">
                    <h4>PREFERENCES</h4>
                    <div className="settings-aside-item appearance" onClick={() => setSettingsView("appearance")}>
                        <ColorLensOutlined />
                        <span>Appearance</span>
                    </div>
                    <div className="settings-aside-item language-region" onClick={() => setSettingsView("language-region")}>
                        <LanguageOutlined />
                        <span>Language & Region</span>
                    </div>
                </div>
            </div>
            <div className="settings-main">
                <h1>Settings</h1>
                {settingsView === "profile-information" && <ProfileInformation/> }
                {settingsView === "account-security" && <div>Account & Security Settings</div>}
                {settingsView === "notifications" && <div>Notifications Settings</div>}
                {settingsView === "privacy" && <div>Privacy Settings</div>}
                {settingsView === "billing-payouts" && <div>Billing & Payouts Settings</div>}
                {settingsView === "connected-accounts" && <div>Connected Accounts Settings</div>}
                {settingsView === "availability" && <div>Availability Settings</div>}
                {settingsView === "services-pricing" && <div>Services & Pricing Settings</div>}
                {settingsView === "bookings" && <div>Bookings Settings</div>}
                {settingsView === "sessions" && <div>Sessions Settings</div>}
                {settingsView === "automations" && <div>Automations Settings</div>}
                {settingsView === "moderation" && <div>Moderation Settings</div>}
                {settingsView === "appearance" && <div>Appearance Settings</div>}
                {settingsView === "language-region" && <div>Language & Region Settings</div>}
            </div>
        </div>
    );
}