import bg from '../assets/default_background_photo.jpg';
import pfp from '../assets/default_profile_photo.jpg';
import { useState } from 'react';
export default function Profile() {
    const [profileTab, setProfileTab] = useState("overview");
    return (
        <div className="profile-view">
            <div className="profile-header" style={{ backgroundImage: `url(${bg})` }}>          
                <div className="profile-header-content">
                    <div className="profile-avatar">
                        <img src={pfp} alt="Profile avatar" />
                    </div>
                    <div className="profile-user-info">
                        <h1 className='h1-style'>Emily Nova</h1>
                        <p>@emily_gamer</p>
                        <p>Boston, MA, 14:00 UTC</p>
                    </div>
                    <div className="profile-user-cta">
                        <button>Book a Session</button>
                        <button>Follow</button>
                        <button>Message</button>
                    </div>
                </div>
            </div>
            <div className="profile-main">
                {/* <div> games section <br /> games section <br /> games section </div>
                <div>Schedule section</div>
                <div>Reviews Section</div> */}
                <div className="profile-main-tabs">
                    <span onClick={()=> setProfileTab("overview")}>Overview</span>
                    <span onClick={()=> setProfileTab("games")}>Games</span>
                    <span onClick={()=> setProfileTab("schedule")}>Schedule</span>
                    <span onClick={()=> setProfileTab("media")}>Media</span>
                </div>
                {profileTab === "overview" && <div className="profile-user-bio">
                <p>Born in Washington DC 1992 <br />
                I am your girl next door <br />
                looking for a man to play valorant with 😉 <br />
                if you are interested hit me up <br />
                Dont be shy</p>
            </div>}
                {profileTab === "games" && <h1>games</h1>}
                {profileTab === "schedule" && <h1>schedule</h1>}
                {profileTab === "media" && <h1>media</h1>}
            </div>
        </div>
    );
}