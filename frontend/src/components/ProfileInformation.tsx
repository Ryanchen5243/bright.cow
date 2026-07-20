import {Add, Language, PermIdentity} from '@mui/icons-material';

export default function ProfileInformation(){

    function addLanguage(){
        //add logic here to pop out a combo box and add a language
    }

    function allowEdits(){
        //add logic here to allow the profile information to be edited when clicked
    }

    return(
        <div className="settings-profile-container">
            <h2>Profile Information</h2>
            <p>Update your public profile information and how others see  you.</p>
            {/* This is the first panel which has all the profile details and display name etc. */}
            <div className="profile-panel">
                {/* The top part of the card which has t he edit button and title/subtitle */}
                <div className="settings-container-test">
                    <div >
                        <div className="settings-profile-alignment">
                            <PermIdentity className="settings-profile-svg"/>
                            <h3 className="settings-profile-detail-title">Profile Details</h3>
                        </div>
                        <p className="settings-profile-subtitle">Manage how your public profile appears.</p>
                    </div>
                    <div className="settings-button-container">
                        <button className="settings-edit-button" onClick={allowEdits}>Edit</button>
                    </div>
                </div>

                {/* User fields */}
                <div className="settings-detail-container">
                    <div className="settings-profile-picture">
                        <img src="src/assets/default_profile_photo.jpg" className="settings-profile-photo"/>
                    </div>
                    <div className="settings-profile-information">
                        <div className="settings-input-group">
                            <label htmlFor="display_name" className="settings-input-label">Display name</label>
                            <input className="settings-detail-one-box" type="text" id="display_name" name="display_name" placeholder="Enter display name"/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="username" className="settings-input-label">Username</label>
                            <input className="settings-detail-one-box" type="text" id="username" name="username" placeholder="Enter username"/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="bio" className="settings-input-label">Bio</label>
                            <textarea className="settings-detail-bio" id="bio" name="bio" placeholder="Enter bio"/>
                        </div>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="location" className="settings-input-label">Location</label>
                                <input className="settings-detail-two-box-left" type="text" id="location" name="location" placeholder="Enter Location"/>
                            </div>
                            <div className="settings-input-group">
                                <label htmlFor="gender" className="settings-input-label-right">Gender</label>
                                <input className="settings-detail-two-box-right" type="text" id="gender" name="gender" placeholder="Pick gender"/>
                            </div>
                        </span>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="birthday" className="settings-input-label">Birthday</label>
                                <input className="settings-detail-two-box-left" type="text" id="birthday" name="birthday" placeholder="Enter Birthday"/>
                            </div>
                            <div className="settings-input-group">
                                <label htmlFor="joined" className="settings-input-label-right">Join Date</label>
                                <input className="settings-detail-two-box-right" type="text" id="joined" name="joined" placeholder="Join Date"/>
                            </div>
                        </span>
                        
                        <div className="settings-language-alignment">
                            <div className="settings-profile-alignment">
                                <Language className='settings-profile-svg'/>
                                <h3 className="settings-profile-detail-title">Languages</h3>
                            </div>
                            <p className="settings-profile-subtitle">Add the languages you speak.</p>

                            <div className="settings-language-badges">
                                {/* Maybe add an actual lucide icon here instead of this small + */}
                                <button className="settings-add-language" onClick={addLanguage}><Add/></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
