// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AccountCircle } from "@mui/icons-material";
import { Business } from "@mui/icons-material";
export default function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                <AccountCircle />
                <Business />
                <p>LobbyNest</p>
            </div>
            <div className="nav-right">
                <div><input id="search-input" type='text' placeholder='Search games...'/></div>
            </div>
        </nav>
    )
}