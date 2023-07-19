import './navBar.css'
import { BiHomeAlt2, BiSearch, BiSolidHeart } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { GiAlienStare } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'


export const NavBar = () => {

    const navigate = useNavigate();

    const handleIconsClicked = (path: string) => {

        switch (path) {
            case 'home': navigate('home');
                break
            case 'search': navigate('search');
                break
            case 'form': navigate('form')
                break
            case 'library': navigate('library')
                break
            case 'user': navigate('user')
                break
        }
    }

    const iconsNavbar = [
        {
            id: "home-icon",
            path: "home"
        },
        {
            id: "search-icon",
            path: "search"
        },
        {
            id: "add-icon",
            path: "form"
        },
        {
            id: "fav-icon",
            path: "library"
        },
        {
            id: "user-icon",
            path: "user"
        }
    ]

    return (
        <nav className="navBar-bottom-container">
            {iconsNavbar.map((icon, index) => (
                <div className="icon-navbar-container" key={icon.id}>
                    <input id={icon.id} name="icon-navbar-bottom" type="radio" className="input-navbar-bottom" />
                    <label htmlFor={icon.id} className="label-navbar-bottom">
                        {index === 0 && <BiHomeAlt2 className="icons-navbar" onClick={() => handleIconsClicked(icon.path)} />}
                        {index === 1 && <BiSearch className="icons-navbar" onClick={() => handleIconsClicked(icon.path)} />}
                        {index === 2 && <MdLibraryAdd className="icons-navbar" onClick={() => handleIconsClicked(icon.path)} />}
                        {index === 3 && <BiSolidHeart className="icons-navbar" onClick={() => handleIconsClicked(icon.path)} />}
                        {index === 4 && <GiAlienStare className="icons-navbar" onClick={() => handleIconsClicked(icon.path)} />}

                    </label>
                </div>
            ))}
        </nav>
    )
}
