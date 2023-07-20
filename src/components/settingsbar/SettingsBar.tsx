import { LogoutButton } from "../logout/Logout"
import { IoIosConstruct } from "react-icons/io";
import './settingsBar.css'

export const SettingsBar = () =>{


    return(
        <nav className="settings-menu-bar">
       
        <span className="setting-menu-options-construction">Language <IoIosConstruct className = 'construction-icon'/></span>
        <span className="setting-menu-options-construction">Notifications <IoIosConstruct  className = 'construction-icon'/></span>
        <LogoutButton/>
        </nav>
    )
}