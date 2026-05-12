import { useState } from "react";
import LandingMain from "./LandingMain";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
export default function AppBody() {
    const [appView, setAppView] = useState("home");
    return (
        <div className="app-body">
            <LeftAside setAppView={setAppView} />
            <LandingMain appView={appView} />
            <RightAside />
        </div>
    );
}