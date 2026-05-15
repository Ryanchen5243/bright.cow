import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useState } from "react";

export default function RightAside({ appView }: { appView: string }) {
    const [donationAmount, setDonationAmount] = useState("");
    return (
        <div className="right-aside">
            {appView !== "profile" && <div>generic right aside</div>}
            {appView === "profile" && <div className="profile-right-aside">
                <div id="profile-right-aside-donation-container">
                    <h2 className="h2-style">Support Luna</h2>
                    <span>Show your love and support for Luna! Every bit helps and means the world &lt;3</span>
                    <div id="profile-right-aside-donation-amount-container-general">
                        <div id="profile-right-aside-donation-amount-container-1">
                            <span className={`donation-amount ${donationAmount === "5" ? "active" : ""}`} onClick={() => setDonationAmount("5")}>
                                <span>$5</span>
                                <p>Thanks!</p>
                            </span>
                            <span className={`donation-amount ${donationAmount === "10" ? "active" : ""}`} onClick={() => setDonationAmount("10")}>
                                <span>$10</span>
                                <p>You're amazing!</p>
                            </span>
                        </div>
                        <div id="profile-right-aside-donation-amount-container-2">
                            <span className={`donation-amount ${donationAmount === "25" ? "active" : ""}`} onClick={() => setDonationAmount("25")}>
                                <span>$25</span>
                                <p>Super star!</p>
                            </span>
                            <span className={`donation-amount ${donationAmount === "50" ? "active" : ""}`} onClick={() => setDonationAmount("50")}>
                                <span>$50</span>
                                <p>Legend!</p>
                            </span>
                        </div>
                    </div>
                    <div id="profile-right-aside-donation-amount-container-custom">
                        <input
                            type="number"
                            placeholder="Custom Amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                        />
                    </div>
                    <button id="profile-right-aside-donation-button" onClick={() => alert(`Donated $${donationAmount}! Thank you for your support!`)}>
                        <FavoriteBorderOutlined />
                        Send Donation
                    </button>
                </div>
                <div id="profile-right-aside-upcoming-sessions">
                    <h2 className="h2-style">Upcoming Sessions</h2>
                    <div id="profile-right-aside-upcoming-session"></div>
                </div>
            </div>}
        </div>
    );
}