import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppMain, { type AppView } from "./AppMain";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/authContext";
import axios from "axios";

export type DbProfile = {
    id: string;
    firebase_uid: string;
    user_name: string;
    user_display_name: string | null;
    profile_photo_url: string | null;
    background_photo_url: string | null;
    bio: string;
    time_zone: string | null;
    account_status: string;
    created_at: string;
    updated_at: string;
    last_login_at: string | null;
};

export default function ApplicationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = useAuth();
    const [myDbProfile, setMyDbProfile] = useState<DbProfile | null>(null);

    useEffect(() => {
        if (!currentUser) {
            setMyDbProfile(null);
            return;
        }
        let isCancelled = false;

        const userName = currentUser.displayName ?? currentUser.email?.split('@')[0] ?? 'user';
        const userDisplayName = currentUser.displayName ?? null;
        const profilePhotoUrl = currentUser.photoURL ?? null;

        // syncUser creates a DB row for first-time sign-ins, then returns the profile
        axios.post('/syncUser', { firebaseUid: currentUser.uid, userName, userDisplayName, profilePhotoUrl })
            .then(({ data }) => { if (!isCancelled) setMyDbProfile(data); })
            .catch((err) => { console.error('syncUser failed:', err.response?.status, err.message); });

        return () => { isCancelled = true; };
    }, [currentUser]);

    const params = new URLSearchParams(location.search);
    const appView: AppView = params.get("view") === "settings" ? "settings" : "home";

    const handleSetAppView = (nextView: AppView) => {
        if (nextView === "settings") { navigate(`/app?view=settings`); return; }
        navigate("/app");
    };

    return (
        <>
            <NavBar setAppView={handleSetAppView} />
            <div className="app-body">
                <AppMain appView={appView} myDbProfile={myDbProfile} />
            </div>
        </>
    );
}