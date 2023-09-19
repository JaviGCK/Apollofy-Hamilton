import './navBar.css'
import { BiHomeAlt2, BiSearch, BiSolidHeart } from 'react-icons/bi'
import { MdLibraryAdd } from 'react-icons/md'
import { GiAlienStare } from 'react-icons/gi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { fetchData, postNewUser } from '../../api/fetchApi'
import { useAuth0 } from '@auth0/auth0-react'
import { useTrackListContext } from '../../utils/hooks/useTrackListContext'
import { TrackType } from '../../types/track'
import { useEffect } from 'react'
import { UserType } from '../profileChart/ProfileChart'
import { useGenreContext } from '../../utils/hooks/useGenresContext'
import { GenreType } from '../../types/genre'


export interface UserDataType {
    userName: string,
    email: string,
    imageUrl?: string
}

export const NavBar = () => {


    const navigate = useNavigate();
    const { user, getAccessTokenSilently } = useAuth0();
    const { currentUser, setCurrentLoggedUser } = useUserContext();
    const { trackList, setNewTrackList } = useTrackListContext();
    const { showGenre, setGenres } = useGenreContext();
    const location = useLocation().pathname.slice(1)




    useEffect(() => {

        const button = document.querySelector(`#${location}`) as HTMLInputElement;
        button.checked = true;

        if (showGenre === null) {

            (async function fetchGenres() {

                const genresFetched = await fetchData(getAccessTokenSilently, "genres") as GenreType[];

                setGenres(genresFetched)
            }())

        }

    }, [])


    if (currentUser === null) {
        (async function fetchUser() {
            const usersFetched = await fetchData(getAccessTokenSilently, 'users') as UserType[];
            const loggedUserObject = usersFetched.find(({ email }) => email === user?.email);

            if (loggedUserObject !== undefined) {
                setCurrentLoggedUser(loggedUserObject);
            } else {
                if (!(user?.email && user.name)) return
                const newUser: UserDataType = {
                    email: user?.email,
                    userName: user?.name,
                    imageUrl: user?.picture
                }
                const newFetchedUser = await postNewUser(getAccessTokenSilently, newUser);
                setCurrentLoggedUser(newFetchedUser);
            }
        }());
    }

    if (trackList === null) {
        // let tracks: TrackType[] = [];
        (async function fetchTracks() {
            const tracksFetched = await fetchData(getAccessTokenSilently, "tracks") as TrackType[];
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
