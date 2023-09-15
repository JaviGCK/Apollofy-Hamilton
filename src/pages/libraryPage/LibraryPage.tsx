import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../../components/filter'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
import { getUserListsReferences, getListByReference } from '../../api/fetchApi'
import { useFilterContext } from '../../utils/hooks/useFilterProvider'
import { PossibleItems } from '../../types/dataTypes/enums'
import { useTranslation } from 'react-i18next'
import { CollectionFilters, FilterCategories } from '../../types/propTypes/filterTypes'


export const LibraryPage = () => {

    const { user, getAccessTokenSilently } = useAuth0();

    const [userLists, setUserLists] = useState<PossibleItems[] | null>(null)
    const [filteredLists, setFilteredLists] = useState<PossibleItems[] | null>(null)

    const { currentFilter } = useFilterContext();

    const { t } = useTranslation();

    if (userLists === null) {

        const allLists: PossibleItems[] = []
        //BUG when first chargin page, sometimes render all items, sometimes no-.

        const getFetch = async () => {
            if (user?.email === undefined) return
            const allUserLists = await getUserListsReferences(getAccessTokenSilently, user?.email)
            const libraryLists = allUserLists[0].libraryList as PossibleItems[]
            await libraryLists.map(async (list: any, index) => {
                const result = await getListByReference(getAccessTokenSilently, list.type, list.id)
                allLists.push(result)
                if (libraryLists.length - 1 === index) setUserLists(allLists);
            })
        }
        getFetch()
    }

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
    ]


    useEffect(() => {

        if (currentFilter === "all") {
            if (userLists === null) return
            setFilteredLists(userLists)

        } else {
            if (userLists === null) return
            const newFilteredLists = userLists?.filter((list: PossibleItems) => list.type?.includes(currentFilter))
            setFilteredLists(newFilteredLists)
        }

    }, [currentFilter, userLists]);


    return (
        <section className='library-page-container'>
            <div className='library-heading'>
                <div className='heading-user'>
                    <figure className='library-user-img'>
                        {user === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={user?.picture} alt={`${user?.name}´s profile image`} />}
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
                    {filteredLists?.map((list) => {
                        return (
                            <GroupItem
                                key={list.id}
                                track={list}
                            />
                        )
                    })}
                </div>
                <div className="white-space"></div>
            </div>
        </section>

    )
}