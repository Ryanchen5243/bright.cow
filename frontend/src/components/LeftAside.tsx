import { Home } from "@mui/icons-material";
import { EmailOutlined }  from "@mui/icons-material";
import { DateRangeOutlined }  from "@mui/icons-material";
import { FavoriteBorderOutlined }  from "@mui/icons-material";
import { LinkedIn } from "@mui/icons-material";
import { X } from "@mui/icons-material";
import { Instagram } from "@mui/icons-material";
import { YouTube } from "@mui/icons-material";
export default function LeftAside({setAppView}: {setAppView: (view: string) => void}) {
    // make collapsable left-aside with icons for messages only
    return (
        <div className="left-aside">
            <div id="left-aside-home" onClick={()=> setAppView("home")}>
                <Home /> 
                <span>Home</span>
            </div>
            <div id="left-aside-messages" onClick={()=> setAppView("messages")}>
                <EmailOutlined />
                <span>Messages</span>
            </div>
            <div id="left-aside-favorites" onClick={()=> setAppView("favorites")}>
                <FavoriteBorderOutlined />
                <span>Favorites</span>
            </div>
            <div id="left-aside-bookings" onClick={()=> setAppView("bookings")}>
                <DateRangeOutlined />
                <span>Bookings</span>
            </div>
            <div id="left-aside-footer">
                <div id="left-aside-footer-cta">
                    <h2 className="h2-style">Get the full UWUvibe experience</h2>
                    <p>Book sessions, chat with creators, and unlock exclusive content.</p>
                    <button onClick={()=>{alert('app coming soon!')}}>Get the App</button>
                </div>
                <div id="left-aside-footer-content">
                    <div id="left-aside-footer-links">
                        <p>@2026 UWUvibe</p>
                        <div>
                            <p>Terms</p>
                            <p>Privacy</p>
                            <p>Help</p>
                            <p>About</p>
                        </div>
                    </div>
                    <div id="left-aside-footer-social">
                        <LinkedIn />
                        <X />
                        <Instagram />
                        <YouTube />
                    </div>
                </div>
            </div>
        </div>
    );
}