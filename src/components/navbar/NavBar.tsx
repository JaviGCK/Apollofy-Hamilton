import './navBar.css'
import { BiHomeAlt2, BiSearch, BiSolidHeart } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { GiAlienStare } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { UserType } from '../../types/dataTypes/user'
import { fetchData, postNewData } from '../../api/fetchApi'
import { useAuth0 } from '@auth0/auth0-react'
import { getUniqueId } from '../../utils/functions/randomId'
import { ListType } from '../../types/dataTypes/enums.d'
import { useTrackListContext } from '../../utils/hooks/useTrackListContext'
import { TrackType } from '../../types/dataTypes/track.d'
import { useEffect } from 'react'


export const NavBar = () => {


    const navigate = useNavigate();
    const { user } = useAuth0();
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { trackList, setNewTrackList } = useTrackListContext();
    const location = useLocation().pathname.slice(1)




    useEffect(() => {

        const button = document.querySelector(`#${location}`) as HTMLInputElement;
        button.checked = true;

    }, [])


    if (currentUser === null) {
        (async function fetchUser() {
            const usersFetched = await fetchData('users') as UserType[];
            const loggedUserObject = usersFetched.find(({ email }) => email === user?.email);

            if (loggedUserObject !== undefined) {
                setCurrentLoggedUser(loggedUserObject);
            } else {
                const newUser: UserType = {
                    id: getUniqueId(),
                    email: user?.email,
                    name: user?.name,
                    profilePicture: user?.picture,
                    type: ListType.USER,
                    libraryList: [],
                    tracks: []
                }
                setCurrentLoggedUser(newUser);
                postNewData(newUser, "users");
            }
        }());
    }

    if (trackList === null) {
        // let tracks: TrackType[] = [];
        (async function fetchTracks() {
            const tracksFetched = await fetchData("tracks") as TrackType[];
            tracksFetched.forEach((track) => {
                track.progress = 0;
                track.duration = 0;
            })
            // console.log(tracksFetched);
            setNewTrackList(tracksFetched);

        }());
    }

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
            id: "home",
            path: "home"
        },
        {
            id: "search",
            path: "search"
        },
        {
            id: "form",
            path: "form"
        },
        {
            id: "library",
            path: "library"
        },
        {
            id: "user",
            path: "user"
        }
    ]

    return (
        <nav className="navBar-bottom-container">
            {iconsNavbar.map((icon, index) => (
                //BUG ERROR EN LA KEY
                <div className="icon-navbar-container" key={index}>
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
