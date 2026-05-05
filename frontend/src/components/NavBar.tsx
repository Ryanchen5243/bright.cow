import { AccountCircle } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
import { Notifications } from '@mui/icons-material';
export default function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <Business className="nav-icon"/>
                <p>LobbyNest</p>
            </div>
            <div className="nav-right">
                <div><input id="search-input" type='text' placeholder='Search games...'/></div>
                <Notifications className="nav-icon"/>
                <AccountCircle className="nav-icon"/>
            </div>
        </nav>
    )
}