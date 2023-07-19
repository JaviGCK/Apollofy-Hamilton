import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../../components/filter'
import { listsFilterCategories } from '../../assets/globalVariables'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
import { GroupButton } from '../../components/lists/groupButtons/GroupButton'
import { fetchData } from '../../api/fetchApi'
import { UserType } from '../../types/dataTypes/user'
import { useFilterContext } from '../../utils/hooks/useFilterProvider'
import { ArtistType } from '../../types/dataTypes/artist'
import { PlaylistType } from '../../types/dataTypes/playlist'
import { AlbumType } from '../../types/dataTypes/album'


export const LibraryPage = () => {
    const { user } = useAuth0();
    const [users, setUsers] = useState<UserType[]>([]);
    const [albums, setAlbums] = useState<AlbumType[]>([]);
    const [playlists, setPlaylist] = useState<PlaylistType[]>([]);
    const [artists, setArtists] = useState<ArtistType[]>([]);
    const { currentFilter } = useFilterContext();

    let allLists: any;

    useEffect(() => {
        
        (async function fetchUsers() {
            const usersFetched = await fetchData("users") as UserType[];
            setUsers(usersFetched);
        })();
        (async function fetchAlbums() {
            const albumsFetched = await fetchData("albums") as AlbumType[];
            setAlbums(albumsFetched);
            allLists.push(albumsFetched)
        })();
        (async function fetchPlaylists() {
            const playlistsFetched = await fetchData("playlists") as PlaylistType[];
            setPlaylist(playlistsFetched);
            allLists.push(playlistsFetched)
        })();
        (async function fetchArtists() {
            const artistsFetched = await fetchData("artists") as ArtistType[];
            setArtists(artistsFetched);
            allLists.push(artistsFetched)
        })();

    }, []);


    const filterByType = (users: UserType[], currentFilter: string): UserType[] => {
        const filteredUsers: UserType[] = [];

        users.map((loggedUser) => {
            if (loggedUser.email === user?.email) {

                loggedUser.libraryList?.forEach((listType) => {
                    if (listType.type === currentFilter) {
                        filteredUsers.push(listType)
                    } else {
                        filteredUsers.push(listType)
                    }
                })

            }
        })

        return filteredUsers;

    };
    const filteredUsers = filterByType(users, currentFilter)
console.log(filteredUsers);
    const dataFetched = (() => {
        const dataArr:any [] = []
        return dataArr.push(playlists, albums, artists);
        
    })
    dataFetched()    

    return (
        <section className='library-page-container'>
            <div className='library-heading'>
                <div className='heading-user'>
                    <figure className='library-user-img'>
                        {user === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={user?.picture} alt={`${user?.name}´s profile image`} />}
                    </figure>
                    {user === undefined ? <h2>Your Library</h2> : <h2>{`${user?.name}´s Library`}</h2>}

                </div>
                <div className='heading-buttons'>
                    <BiSearch className='library-button-icon' />
                    <BiPlus className='library-button-icon' />
                </div>
            </div>
            <Filter filters={listsFilterCategories} />
            <div>
                {/*filteredList.map(() => )*/}
            </div>
            {filteredUsers.map((list) => {

                return (
                    <GroupItem listId={list.id} listType={currentFilter} key={list.id} />
                )
            })}

            <GroupButton buttonType="Artist" />
            <GroupButton buttonType="Album" />
            <div className="white-space"></div>
        </section>

    )
}
