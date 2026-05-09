import { Home } from "@mui/icons-material";
import { Message }  from "@mui/icons-material";
import { People }  from "@mui/icons-material";
import { SportsEsports }  from "@mui/icons-material";
import { BookOnline }  from "@mui/icons-material";
import { Settings }  from "@mui/icons-material";
import { KeyboardArrowRight } from "@mui/icons-material";
export default function LeftAside() {
    return (
        <div className="left-aside">
            <div id="left-aside-home">
                <Home /> 
                <span>Home</span>
            </div>
            <div id="left-aside-messages">
                <Message />
                <span>Messages</span>
            </div>
            <div id="left-aside-following">
                <People />
                <span>Following</span>
            </div>
            <div id="left-aside-games">
                <SportsEsports />
                <span>Games</span>
            </div>
            <div id="left-aside-bookings">
                <BookOnline />
                <span>Bookings</span>
            </div>
            <div id="left-aside-setting">
                <Settings />
                <span>Settings</span>
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