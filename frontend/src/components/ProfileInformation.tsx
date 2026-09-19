import {Add, Close, Edit, Language, PermIdentity, PhotoCamera, Save} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import defaultProfilePhoto from '../assets/default_profile_photo.jpg';
import type { DbProfile } from './ApplicationPage';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProfileInformation({ myDbProfile }: { myDbProfile: DbProfile | null }){
    const [isDisabled, setIsDisabled] = useState(true);
    const [languageOpen, setLanguageOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [languages, setLanguages] = useState<string[]>([]);
    const [pickedPhoto, setPickedPhoto] = useState<string | null>(null);
    const [displayName, setDisplayName] = useState("");
    const [username, setUsername] = useState("");
    const [bio, setBio] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");
    const profilePhotoInputRef = useRef<HTMLInputElement>(null);

    // Object URLs stay alive until revoked, so drop the previous one whenever
    // the photo changes and on unmount.
    useEffect(() => {
        if(!pickedPhoto){
            return;
        }
        return () => URL.revokeObjectURL(pickedPhoto);
    }, [pickedPhoto]);

    // Fill the form once the profile arrives from the backend
    useEffect(() => {
        if(!myDbProfile){
            return;
        }
        setDisplayName(myDbProfile.user_display_name ?? "");
        setUsername(myDbProfile.user_name);
        setBio(myDbProfile.bio);
    }, [myDbProfile]);

    function choosingProfilePhoto(){
        profilePhotoInputRef.current?.click();
    }

    function changingProfilePhoto(event: React.ChangeEvent<HTMLInputElement>){
        const file = event.target.files?.[0];

        if(file){
            setPickedPhoto(URL.createObjectURL(file));
        }
        //reset so picking the same file again still fires a change event
        event.target.value = "";
    }

    function addLanguage(){
        //add logic here to pop out a combo box and add a language
        setLanguageOpen((prev) => !prev);
    }

    async function allowEdits(){
        //the button enters edit mode first, then saves on the following click
        if(isDisabled){
            setSaveError("");
            setIsDisabled(false);
            return;
        }

        if(!myDbProfile){
            setSaveError("Your profile is still loading. Please try again.");
            return;
        }

        setIsSaving(true);
        try{
            await axios.patch("/api/users/me/profile", {
                firebaseUid: myDbProfile.firebase_uid,
                userName: username,
                userDisplayName: displayName,
                bio,
            });
            setSaveError("");
            setIsDisabled(true);
        }catch(error){
            const message = axios.isAxiosError(error) ? error.response?.data?.error : undefined;
            setSaveError(typeof message === "string" ? message : "We couldn't save your changes. Please try again.");
        }finally{
            setIsSaving(false);
        }
    }

    function addingLanguage(value: unknown){
        const language = value as string | null;

        if(language){
            setLanguages((prev) => prev.includes(language) ? prev : [...prev, language]);
        }
        setLanguageOpen(false);
    }

    function removeLanguage(language: string){
        setLanguages((prev) => prev.filter((item) => item !== language));
    }

    const photoSrc = pickedPhoto ?? myDbProfile?.profile_photo_url ?? defaultProfilePhoto;
    const joinDate = myDbProfile ? new Date(myDbProfile.created_at).toLocaleDateString() : "";
    const locationOptions = ["San Francisco", "New York", "London", "Barcelona", "Remote"];
    const genderOptions = ["Female", "Male", "Non-binary", "Prefer not to say"];
    const languageOptions = ["English", "Spanish", "Mandarin", "French", "German", "Japanese", "Korean"];
    const unusedLanguages = languageOptions.filter((option) => !languages.includes(option));

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
                        <button className="settings-edit-button" onClick={allowEdits} disabled={isSaving}>
                            {isDisabled ?
                                <div className='flex justify-center items-center'><Edit sx={{fontSize: 17}} className='mr-1'/> Edit</div> :
                                <div className='flex justify-center items-center'><Save sx={{fontSize: 17}} className='mr-1'/> {isSaving ? "Saving..." : "Save"}</div>
                            }
                        </button>
                        {saveError && <p className="text-sm text-red-300 mr-6 mt-1">{saveError}</p>}
                    </div>
                </div>
                
                {/* User fields */}
                <div className="settings-detail-container">
                    <div className="settings-profile-picture">
                        <button
                            type="button"
                            className="settings-profile-photo-button"
                            onClick={choosingProfilePhoto}
                            aria-label="Change profile picture"
                        >
                            <img src={photoSrc} className="settings-profile-photo" alt="Profile"/>
                            <span className="settings-profile-photo-overlay">
                                <PhotoCamera sx={{fontSize: 40}}/>
                            </span>
                        </button>
                        <input
                            ref={profilePhotoInputRef}
                            type="file"
                            accept="image/*"
                            className="settings-profile-photo-input"
                            onChange={changingProfilePhoto}
                        />
                    </div>
                    <div className="settings-profile-information">
                        <div className="settings-input-group">
                            <label htmlFor="display_name" className="settings-input-label">Display name</label>
                            <input className="settings-detail-one-box" type="text" id="display_name" name="display_name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} disabled={isDisabled} maxLength={50}/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="username" className="settings-input-label">Username</label>
                            <input className="settings-detail-one-box" type="text" id="username" name="username" value={username} onChange={(event) => setUsername(event.target.value)} disabled={isDisabled} maxLength={25}/>
                        </div>

                        <div className="settings-input-group">
                            <label htmlFor="bio" className="settings-input-label">Bio</label>
                            <textarea className="settings-detail-bio" id="bio" name="bio" value={bio} onChange={(event) => setBio(event.target.value)} disabled={isDisabled} maxLength={150} />
                        </div>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="location" className="settings-input-label">Location</label>
                                <Combobox
                                    items={locationOptions}
                                    value={selectedLocation}
                                    onValueChange={(value) => setSelectedLocation((value as string) ?? "")}
                                    disabled={isDisabled}
                                >
                                    <ComboboxInput
                                        id="location"
                                        name="location"
                                        className="w-full settings-detail-two-box-left"
                                        placeholder="Select a location"
                                        disabled={isDisabled}
                                    />
                                <ComboboxContent
                                    className="settings-detail-two-box-left-content"
                                    style={{ width: "var(--anchor-width, 100%)", minWidth: "var(--anchor-width, 100%)" }}
                                >
                                        <ComboboxEmpty>No items found.</ComboboxEmpty>

                                        <ComboboxList>
                                            {(item) => (
                                                <ComboboxItem key={item} value={item}>
                                                    {item}
                                                </ComboboxItem>
                                            )}
                                        </ComboboxList>
                                    </ComboboxContent>
                                </Combobox>
                            </div>
                            <div className="settings-input-group">
                                <label htmlFor="gender" className="settings-input-label-right">Gender</label>
                                <Select
                                    id="gender"
                                    name="gender"
                                    value={selectedGender}
                                    onValueChange={(value) => setSelectedGender((value as string) ?? "")}
                                    disabled={isDisabled}
                                >
                                    <SelectTrigger className="settings-detail-two-box-right">
                                        <SelectValue placeholder="Pick gender" />
                                    </SelectTrigger>
                                    <SelectContent
                                        className="settings-detail-two-box-right-content"
                                        alignItemWithTrigger={false}
                                        align="start"
                                    >
                                        {genderOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </span>

                        <span className="settings-container">
                            <div className="settings-input-group">
                                <label htmlFor="birthday" className="settings-input-label">Birthday</label>
                                <input className="settings-detail-two-box-left" type="text" id="birthday" name="birthday" placeholder="Enter Birthday" disabled={true} value=""/>
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
                                {languages.map((language) => (
                                    <span key={language} className="settings-language-badge">
                                        {language}
                                        <button
                                            type="button"
                                            className="settings-language-badge-remove"
                                            onClick={() => removeLanguage(language)}
                                            aria-label={`Remove ${language}`}
                                        >
                                            <Close sx={{fontSize: 14}}/>
                                        </button>
                                    </span>
                                ))}

                                {/* Maybe add an actual lucide icon here instead of this small + */}
                                
                                {languageOpen ? (
                                    <div className='settings-language-combobox'>
                                        <Combobox
                                            items={unusedLanguages}
                                            onValueChange={addingLanguage}
                                        >
                                            {/* TODO: CHANGE THIS COLOR LATER */}
                                            <ComboboxInput
                                                id="language"
                                                name="language"
                                                className="w-2xs rounded-lg bg-(--vibrant-purple)" 
                                                placeholder="Select a language"
                                            />
                                        {/* TODO: CHANGE THIS COLOR LATER */}
                                        <ComboboxContent
                                            className="bg-purple-600 cursor-pointer"
                                            style={{ width: "var(--anchor-width, 100%)", minWidth: "var(--anchor-width, 100%)" }}
                                        >
                                                <ComboboxEmpty>No items found.</ComboboxEmpty>

                                                <ComboboxList>
                                                    {(item) => (
                                                        <ComboboxItem key={item} value={item}>
                                                            {item}
                                                        </ComboboxItem>
                                                    )}
                                                </ComboboxList>
                                            </ComboboxContent>
                                        </Combobox>
                                    </div>
                                ):
                                <button className="settings-add-language" onClick={addLanguage}><Add/></button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}