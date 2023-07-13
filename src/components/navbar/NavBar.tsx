import './navBar.css'
import { BiHomeAlt2, BiSearch, BiSolidHeart } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { GiAlienStare } from 'react-icons/gi'


export const NavBar = () => {

    const iconsNavbar = ["home-icon", "search-icon", "add-icon", "fav-icon", "user-icon"]

    return (
        <nav className="navBar-bottom-container">
            {iconsNavbar.map((icon, index) => (
                <div className="icon-navbar-container" key={icon}>
                    <input id={icon} name="icon-navbar-bottom" type="radio" className="input-navbar-bottom" />
                    <label htmlFor={icon} className="label-navbar-bottom">
                        {index === 0 && <BiHomeAlt2 className="icons-navbar"/> }
                        {index === 1 && <BiSearch className="icons-navbar"/>}
                        {index === 2 && <MdLibraryAdd className="icons-navbar"/>}
                        {index === 3 && <BiSolidHeart className="icons-navbar"/>}
                        {index === 4 && <GiAlienStare className="icons-navbar"/>}

                    </label>
                </div>
            ))}
        </nav>
    )
}
