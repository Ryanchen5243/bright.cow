import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AppMain from "./AppMain";
import NavBar from "./NavBar";

const allowedViews = new Set(["home", "profile", "settings"]);

const normalizeView = (view: string | null) => {
    if (!view || !allowedViews.has(view)) {
        return "home";
    }
    return view;
};

export default function ApplicationPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [appView, setAppView] = useState(() => normalizeView(searchParams.get("view")));

    useEffect(() => {
        const nextView = normalizeView(searchParams.get("view"));
        setAppView((currentView) => (currentView === nextView ? currentView : nextView));
    }, [searchParams]);

    const handleSetAppView = (nextView: string) => {
        const normalizedView = normalizeView(nextView);
        setAppView(normalizedView);
        if (normalizedView === "home") {
            setSearchParams({});
            return;
        }
        setSearchParams({ view: normalizedView });
    };

    return (
        <>
            <NavBar setAppView={handleSetAppView} />
            <div className="app-body">
                <AppMain appView={appView} />
            </div>
        </>
    );
}