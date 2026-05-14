import { Home } from "@mui/icons-material";
import { Message }  from "@mui/icons-material";
import { BookOnline }  from "@mui/icons-material";
import { Favorite }  from "@mui/icons-material";
import { KeyboardArrowRight } from "@mui/icons-material";
export default function LeftAside({setAppView}: {setAppView: (view: string) => void}) {
    // make collapsable left-aside with icons for messages only
    return (
        <div className="left-aside">
            <div id="left-aside-home" onClick={()=> setAppView("home")}>
                <Home /> 
                <span>Home</span>
            </div>
            <div id="left-aside-messages" onClick={()=> setAppView("messages")}>
                <Message />
                <span>Messages</span>
            </div>
            <div id="left-aside-favorites" onClick={()=> setAppView("favorites")}>
                <Favorite />
                <span>Favorites</span>
            </div>
            <div id="left-aside-bookings" onClick={()=> setAppView("bookings")}>
                <BookOnline />
                <span>Bookings</span>
            </div>
            <div id="left-aside-need-help">
                <div id="left-aside-need-help-content">
                    <span>Need Help?</span>
                    <span> Visit our Support Center </span>
                </div>
                <KeyboardArrowRight />
            </div>
        </div>
    );
}