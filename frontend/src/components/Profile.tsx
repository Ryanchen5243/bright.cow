import bg from '../assets/default_background_photo.jpg';
import pfp from '../assets/default_profile_photo.jpg';
export default function Profile() {
    return (
        <div className="profile-view">
            <div className="profile-header" style={{ backgroundImage: `url(${bg})` }}>          
                <div className="profile-header-content">
                    <div className="profile-avatar">
                        <img src={pfp} alt="Profile avatar" />
                    </div>
                    <div className="profile-user-info">
                        <h1 className='h1-style'>Emily </h1>
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
                <h1>other main</h1>
            </div>
        </div>
    );
}