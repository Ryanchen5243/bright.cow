import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppMain, { type AppView } from "./AppMain";
import NavBar from "./NavBar";

export default function ApplicationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { creatorUserName } = useParams();
    const [creatorExists, setCreatorExists] = useState<boolean | null>(null);

    useEffect(() => {
        let isCancelled = false;

        if (!creatorUserName) {
            setCreatorExists(null);
            return () => {
                isCancelled = true;
            };
        }

        const validateCreatorUserName = async () => {
            try {
                const response = await fetch(new URL('../mocks/seedProfiles.json', import.meta.url).href);
                if (!response.ok) {
                    if (!isCancelled) {
                        setCreatorExists(false);
                    }
                    return;
                }
                const data = await response.json();
                const exists = (Array.isArray(data) ? data : []).some(
                    (creator: { userName: string }) => creator.userName === creatorUserName
                );
                if (!isCancelled) {
                    setCreatorExists(exists);
                }
            } catch {
                if (!isCancelled) {
                    setCreatorExists(false);
                }
            }
        };

        validateCreatorUserName();

        return () => {
            isCancelled = true;
        };
    }, [creatorUserName]);

    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");
    const checkoutStatus = params.get("checkout");
    const appView: AppView = creatorUserName
        ? creatorExists === null
            ? "creator-loading"
            : creatorExists
                ? "profile"
                : "creator-not-found"
        : viewParam === "settings"
            ? "settings"
            : "home";

    const handleSetAppView = (nextView: AppView) => {
        if (nextView === "profile") {
            navigate(`/app/profile/@luna_gamer`);
            return;
        }

        if (nextView === "settings") {
            navigate(`/app?view=settings`);
            return;
        }

        if (nextView === "home") {
            navigate("/app");
            return;
        }

        navigate("/app");
    };

    return (
        <>
            <NavBar setAppView={handleSetAppView} />
            {checkoutStatus === "success" && (
                <div className="checkout-confirmation" role="status">
                    <div>
                        <strong>Payment received — your booking is processing.</strong>
                        <span>We’ll confirm the session details shortly.</span>
                    </div>
                    <button type="button" onClick={() => navigate("/app", { replace: true })} aria-label="Dismiss payment confirmation">×</button>
                </div>
            )}
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
                <AppMain appView={appView} creatorUserName={creatorUserName} />
            </div>
        </>
    );
}
