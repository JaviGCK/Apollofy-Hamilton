import './libraryPage.css'
import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../../components/filter'
import { listsFilterCategories } from '../../assets/globalVariables'
import { useEffect, useState } from 'react'
import { GroupItem } from '../../components/lists/groupItem/GroupItem'
import { PossibleItems } from '../../types/dataTypes/enums'
import { GroupButton } from '../../components/lists/groupButtons/GroupButton'


export const LibraryPage = () => {

    const { user } = useAuth0()
    const [result, setResult] = useState([])

    useEffect(() => {
        const api = async () => {
            const data = await fetch("http://localhost:3001/albums")
            const result = await data.json()
            setResult(result)

        }
        api()


    }, [])

    console.log(result)

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
            {result.map((group: PossibleItems) => {
                return (
                    <GroupItem list={group} key={group.id} />
                )
            })}

            <GroupButton buttonType="Artist" />
            <GroupButton buttonType="Album" />
            <div className="white-space"></div>
        </section>
        
    )
}
