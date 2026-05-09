import LandingMain from "./LandingMain";
import LeftAside from "./LeftAside";
import RightAside from "./RightAside";
export default function AppBody() {
    return (
        <div className="app-body">
            <LeftAside />
            <LandingMain />
            <RightAside />
        </div>
    );
}