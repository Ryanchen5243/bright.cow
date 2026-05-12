import { useState } from "react";
import AppMain from "./AppMain";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
export default function AppBody() {
    const [appView, setAppView] = useState("home");
    return (
        <div className="app-body">
            <LeftAside setAppView={setAppView} />
            <AppMain appView={appView} />
            <RightAside />
        </div>
    );
}