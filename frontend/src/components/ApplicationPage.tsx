import { useState } from "react";
import AppMain from "./AppMain";
import LeftAside from "./LeftAside";
import NavBar from "./NavBar";
export default function ApplicationPage() {
    const [appView, setAppView] = useState("home");
    return (
        <>
            <NavBar setAppView={setAppView} />
            <div className="app-body">
                <LeftAside setAppView={setAppView} />
                <AppMain appView={appView} />
            </div>
        </>
    );
}