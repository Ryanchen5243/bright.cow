import { useState } from "react";
import AppMain from "./AppMain";
import NavBar from "./NavBar";
export default function ApplicationPage() {
    const [appView, setAppView] = useState("home");
    return (
        <>
            <NavBar setAppView={setAppView} />
            <div className="app-body">
                <AppMain appView={appView} />
            </div>
        </>
    );
}