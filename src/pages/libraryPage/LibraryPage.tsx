import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../../components/filter'
import { listsFilterCategories } from '../../assets/globalVariables'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
import { GroupButton } from '../../components/lists/groupButtons/GroupButton'
import { getUserListsReferences, getListByReference } from '../../api/fetchApi'
import { useFilterContext } from '../../utils/hooks/useFilterProvider'
import { PossibleItems } from '../../types/dataTypes/enums'


export const LibraryPage = () => {

    const { user } = useAuth0();

    const [userLists, setUserLists] = useState<PossibleItems[] | null>(null)
    const [filteredLists, setFilteredLists] = useState<PossibleItems[] | null>(null)

    const { currentFilter } = useFilterContext();



    if (userLists === null) {

        const allLists: PossibleItems[] = []
        //BUG when first chargin page, sometimes render all items, sometimes no-.

        const getFetch = async () => {
            if (user?.email === undefined) return
            const allUserLists = await getUserListsReferences(user?.email)
            const libraryLists = allUserLists[0].libraryList
            await libraryLists.map(async (list: any) => {
                const result = await getListByReference(list.type, list.id)
                allLists.push(result)
                setUserLists(allLists)
            })
        }
        getFetch()
    }


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
                    {user === undefined ? <h2>Your Library</h2> : <h2>{`${user?.given_name}´s Library`}</h2>}

                </div>
                <div className='heading-buttons'>
                    <BiSearch className='library-button-icon' />
                    <BiPlus className='library-button-icon' />
                </div>
            </div>
            <Filter filters={listsFilterCategories} />
            <div>
                {filteredLists?.map((list) => {

                    return (
                        <GroupItem
                            key={list.id}
                            imageUrl={list.imageUrl}
                            name={list.name}
                            type={list.type}
                        />
                    )
                })}
            </div>

            <GroupButton buttonType="Artist" />
            <GroupButton buttonType="Album" />
            <div className="white-space"></div>
        </section>

    )
}