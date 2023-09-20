import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { Filter } from '../../components/filter'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
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
import { useUserLibraryListContext } from '../../utils/hooks/useUserLibraryListContext'

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

    const { currentUser } = useUserContext()

    const { currentFilter } = useFilterContext();
    const { userLibraryList } = useUserLibraryListContext();
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
        if (userLibraryList) {
            if (currentFilter === "all") {
                if (userLibraryList === null) return
                setFilteredLists(userLibraryList)
            } else {
                if (userLibraryList === null) return
                const newFilteredLists = userLibraryList?.filter((list: PossibleItems) => list.listType?.includes(currentFilter))
                setFilteredLists(newFilteredLists)
            }
        }
    }, [currentFilter, userLibraryList]);

    return (
        <section className='library-page-container'>
            <div className='library-heading'>
                <div className='heading-user'>
                    <figure className='library-user-img'>
                        <div className='profile-img-container'>
                            {currentUser === undefined ? <img className='pcc-profile-image' src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={currentUser?.imageUrl} alt={`${currentUser?.userName}´s profile image`} />}
                        </div>
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