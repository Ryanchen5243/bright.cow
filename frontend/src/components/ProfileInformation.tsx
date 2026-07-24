import {Add, Edit, Language, PermIdentity, Save} from '@mui/icons-material';
import { useState } from 'react';

export default function ProfileInformation(){
    const [isDisabled, setIsDisabled] = useState(true);
    function addLanguage(){
        //add logic here to pop out a combo box and add a language
    }

    function allowEdits(){
        //add logic here to allow the profile information to be edited when clicked
        const currentState = isDisabled;
        setIsDisabled(!currentState);

        if(currentState == true){
            //implement logic to change db
        }
    }

    const displayName = "temp Display Name";
    const username = "temp username";
    const bio = "some bio";
    const location = "some location";
    const birthday = "some birthday";
    const gender = "a gender";
    const joinDate = "7/6/67";

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
                        <button className="settings-edit-button" onClick={allowEdits}>
                            {isDisabled ?
                                <div className='flex justify-center items-center'><Edit sx={{fontSize: 17}} className='mr-1'/> Edit</div> :
                                <div className='flex justify-center items-center'><Save sx={{fontSize: 17}} className='mr-1'/> Save</div>
                            }
                        </button>
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
                            <input className="settings-detail-one-box" type="text" id="display_name" name="display_name" defaultValue={displayName} disabled={isDisabled}/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="username" className="settings-input-label">Username</label>
                            <input className="settings-detail-one-box" type="text" id="username" name="username" defaultValue={username} disabled={isDisabled}/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="bio" className="settings-input-label">Bio</label>
                            <textarea className="settings-detail-bio" id="bio" name="bio" defaultValue={bio} disabled={isDisabled} maxLength={150} />
                        </div>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="location" className="settings-input-label">Location</label>
                                <input className="settings-detail-two-box-left" type="text" id="location" name="location" disabled={isDisabled} defaultValue={location}/>
                            </div>
                            <div className="settings-input-group">
                                <label htmlFor="gender" className="settings-input-label-right">Gender</label>
                                <input className="settings-detail-two-box-right" type="text" id="gender" name="gender" placeholder="Pick gender" disabled={isDisabled} defaultValue={gender}/>
                            </div>
                        </span>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="birthday" className="settings-input-label">Birthday</label>
                                <input className="settings-detail-two-box-left" type="text" id="birthday" name="birthday" placeholder="Enter Birthday" disabled={true} value={birthday}/>
                            </div>
                            <div className="settings-input-group">
                                <label htmlFor="joined" className="settings-input-label-right">Join Date</label>
                                <input className="settings-detail-two-box-right" type="text" id="joined" name="joined" placeholder="Join Date" disabled={true} value={joinDate}/>
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
