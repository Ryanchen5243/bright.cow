// import {Business as BusinessIcon} from "@mui/icons-material"; // dont work
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";// works??
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// named vs default imports 
export default function NavBar() {
    return (
        <nav>
            <div className="nav-left">
                {/* <AccountCircleIcon /> */}
                <p>LobbyNest</p>
            </div>
            <div className="nav-right">
                <div><input id="search-input" type='text' placeholder='Search games...'/></div>
                {/* <div id="nav-profile-icon"><AccountCircleIcon /></div> */}
            </div>
        </nav>
    )
}