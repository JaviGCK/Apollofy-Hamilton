import { BiSearch, BiPlus } from 'react-icons/bi'
import { useAuth0 } from '@auth0/auth0-react'
import { Filter } from '../components/filter'
import { listsFilterCategories } from '../assets/globalVariables'
import { useEffect, useState } from 'react'
import { GroupItem } from '../components/lists/groupItem/GroupItem'
import { PossibleItems } from '../types/dataTypes/enums'


export const LibraryPage = () => {

    const { user } = useAuth0()
    const [result, setResult] = useState([])

    useEffect(() => {
        const api = async () => {
            const data = await fetch("http://localhost:3000/albums")
            const result = await data.json()
            setResult(result)

        }
        api()


    }, [])

    console.log(result)

    return (
        <>
            <div>
                <div>
                    {user === undefined ? <img src="/src/assets/img/defaultuser.webp" alt="default user image" /> : <img src={user?.picture} alt={`${user?.name}´s profile image`} />}
                    {user === undefined ? <h2>Library</h2> : <h2>{`${user?.name}´s Library`}</h2>}

                </div>
                <div>
                    <BiSearch />
                    <BiPlus />
                </div>
            </div>
            <Filter filters={listsFilterCategories} />
            {result.map((group: PossibleItems) => {
                return (
                    <GroupItem list={group} key={group.id} />
                )
            })}
        </>
    )
}
