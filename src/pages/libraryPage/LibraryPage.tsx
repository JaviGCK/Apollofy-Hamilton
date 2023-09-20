import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../../components/filter'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
import { fetchData } from '../../api/fetchApi'
import { useFilterContext } from '../../utils/hooks/useFilterProvider'
import { ListType, PossibleItems } from '../../types/enums'
import { useTranslation } from 'react-i18next'
import { CollectionFilters } from '../../context/FilterContext'
import { useUserContext } from '../../utils/hooks/useUserContext'
import { ArtistType } from '../../types/artist'
import { AlbumType } from '../../types/album'
import { PlaylistType } from '../../types/playlist'
import { TrackType } from '../../types/track'
import { getUniqueId } from '../../utils/functions/randomId'

export type FilterCategories = {
    name: string
    id: string
    filter: CollectionFilters
}

export type FavouriteType = {
    id: string,
    artist: ArtistType | null,
    album: AlbumType | null,
    playlist: PlaylistType | null,
    track: TrackType | null,
    listType: ListType,
    userId?: string
}

export const LibraryPage = () => {

    const { getAccessTokenSilently } = useAuth0();

    const { currentUser } = useUserContext()

    const { currentFilter } = useFilterContext();

    const [userLists, setUserLists] = useState<PossibleItems[] | null>(null)
    const [filteredLists, setFilteredLists] = useState<PossibleItems[] | null>(null)


    const { t } = useTranslation();







    const listsFilterCategories: FilterCategories[] = [
        {
            name: t('allSearch'),
            id: "1",
            filter: CollectionFilters.ALL
        },
        {
            name: t('playlistsSearch'),
            id: "2",
            filter: CollectionFilters.PLAYLISTS
        },
        {
            name: t('albumsSearch'),
            id: "3",
            filter: CollectionFilters.ALBUMS
        },
        {
            name: t('artistsSearch'),
            id: "4",
            filter: CollectionFilters.ARTISTS
        },
        {
            name: t('tracksSearch'),
            id: "5",
            filter: CollectionFilters.TRACKS
        }
    ]


    useEffect(() => {

        if (userLists) {
            if (currentFilter === "all") {
                if (userLists === null) return
                setFilteredLists(userLists)

            } else {
                if (userLists === null) return
                const newFilteredLists = userLists?.filter((list: PossibleItems) => list.listType?.includes(currentFilter))
                setFilteredLists(newFilteredLists)
            }
        }


    }, [currentFilter, userLists]);

    useEffect(() => {
        if (currentUser) {
            const allLists: PossibleItems[] = []
            //BUG when first chargin page, sometimes render all items, sometimes no-.

            const getFetch = async () => {
                const favLists = currentUser?.favourites as FavouriteType[]

                if (favLists) {
                    favLists.map(async (list: FavouriteType) => {
                        const type = list.listType;
                        let result: PossibleItems | null = null;
                        switch (type) {
                            case "artist": result = await fetchData(getAccessTokenSilently, `${list.listType}s/${list.artist?.id}`) as ArtistType
                                break;
                            case "track": result = await fetchData(getAccessTokenSilently, `${list.listType}s/${list.track?.id}`) as TrackType
                                break;
                            case "album": result = await fetchData(getAccessTokenSilently, `${list.listType}s/${list.album?.id}`) as AlbumType
                                break;
                            case "playlist": result = await fetchData(getAccessTokenSilently, `${list.listType}s/${list.playlist?.id}`) as PlaylistType
                                break;
                            default: result = null
                        }

                        if (result) allLists.push(result)
                        if (favLists.length === allLists.length) {
                            setUserLists(allLists);
                        }
                    })
                }
            }
            getFetch()
        }

    }, [currentUser])

    return (
        <section className='library-page-container'>
            <div className='library-heading'>
                <div className='heading-user'>
                    <figure className='library-user-img'>
                        {currentUser === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={currentUser?.imageUrl} alt={`${currentUser?.userName}´s profile image`} />}
                    </figure>
                    <h2>{t('yourLibrary')}</h2>
                </div>
                <div className='heading-buttons'>
                    <BiSearch className='library-button-icon' />
                    <BiPlus className='library-button-icon' />
                </div>
            </div>
            <Filter filters={listsFilterCategories} />
            <div className='library-list-items-wrapper'>
                <div className='library-items-container'>
                    {currentUser && filteredLists && filteredLists.map((list) =>
                        <GroupItem
                            key={getUniqueId()}
                            track={list}
                        />

                    )}
                </div>
                <div className="white-space"></div>
            </div>
        </section>

    )
}