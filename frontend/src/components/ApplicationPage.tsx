import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AppMain, { type AppView } from "./AppMain";
import NavBar from "./NavBar";

export default function ApplicationPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { creatorId } = useParams();
    const [creatorExists, setCreatorExists] = useState<boolean | null>(null);

    useEffect(() => {
        let isCancelled = false;

        if (!creatorId) {
            setCreatorExists(null);
            return () => {
                isCancelled = true;
            };
        }

        const validateCreatorId = async () => {
            try {
                const response = await fetch(new URL('../mocks/lunaProfile.json', import.meta.url).href);
                if (!response.ok) {
                    if (!isCancelled) {
                        setCreatorExists(false);
                    }
                    return;
                }
                const data = await response.json();
                const exists = (Array.isArray(data) ? data : []).some(
                    (creator: { id: string }) => creator.id === "816deaf4-ea3f-435e-8a21-a66796c93da4"
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

        validateCreatorId();

        return () => {
            isCancelled = true;
        };
    }, [creatorId]);

    const params = new URLSearchParams(location.search);
    const viewParam = params.get("view");
    const appView: AppView = creatorId
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
            navigate(`/app/profile/luna`);
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
            <div className="app-body">
                <AppMain appView={appView} creatorId={creatorId} />
            </div>
        </>
    );
}