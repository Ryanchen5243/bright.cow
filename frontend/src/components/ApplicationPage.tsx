import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppMain, { type AppView } from "./AppMain";
import NavBar from "./NavBar";
import { useAuth } from "../contexts/authContext";
import authAxios from "../axios/authAxios";

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
    const { currentUser, loading } = useAuth();
    const [currentUserDbProfile, setCurrentUserDbProfile] = useState<DbProfile | null>(null);

    useEffect(() => {
        if (loading || !currentUser) {
            setCurrentUserDbProfile(null);
            return;
        }
        let isCancelled = false;

        const userName = currentUser.displayName ?? currentUser.email?.split('@')[0] ?? 'user';
        const userDisplayName = currentUser.displayName ?? null;
        const profilePhotoUrl = currentUser.photoURL ?? null;

        // syncUser creates a DB row for first-time sign-ins, then returns the profile
        authAxios.post('/auth/syncUser', { userName, userDisplayName, profilePhotoUrl })
            .then(({ data }) => { if (!isCancelled) setCurrentUserDbProfile(data); })
            .catch((err) => { console.error('syncUser failed:', err.response?.status, err.message); });
        

        return () => { isCancelled = true; };
    }, [currentUser, loading]);

    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");
    const profileCreatorId = params.get("creator") ?? undefined;
    const appView: AppView = viewParam === "settings" ? "settings" : viewParam === "profile" ? "profile" : "home";
    const checkoutStatus = params.get("checkout");
    // const appView: AppView = creatorUserName
    //     ? creatorExists === null
    //         ? "creator-loading"
    //         : creatorExists
    //             ? "profile"
    //             : "creator-not-found"
    //     : viewParam === "settings"
    //         ? "settings"
    //         : "home";

    const handleSetAppView = (nextView: AppView, creatorId?: string) => {
        if (nextView === "settings") { navigate(`/app?view=settings`); return; }
        if (nextView === "profile") { navigate(creatorId ? `/app?view=profile&creator=${creatorId}` : `/app?view=profile`); return; }
        navigate("/app");
    };

    return (
        <>
            <NavBar setAppView={handleSetAppView} />
            {checkoutStatus === "cancelled" && (
                <div className="checkout-confirmation checkout-confirmation-cancelled" role="status">
                    <div>
                        <strong>Payment was not completed.</strong>
                        <span>You can return to the creator profile and try again whenever you’re ready.</span>
                    </div>
                    <button type="button" onClick={() => navigate("/app", { replace: true })} aria-label="Dismiss payment message">×</button>
                </div>
            )}
            <div className="app-body">
                <AppMain appView={appView} setAppView={handleSetAppView} currentUserDbProfile={currentUserDbProfile} profileCreatorId={profileCreatorId} />
            </div>
        </>
    );
}
