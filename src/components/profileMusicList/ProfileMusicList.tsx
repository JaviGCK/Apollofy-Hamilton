import './profileMusicList.css'
import { useEffect, useState } from 'react'
import { GroupItem } from '../lists/groupItem/GroupItem'
import { fetchData } from '../../api/fetchApi'
import { UserType } from '../../types/dataTypes/user'

const test = {
    imageUrl: "https://play-lh.googleusercontent.com/rKLMwthaxMG2wXoSRI7gyuoZWkuIUagkFhRh4pFWqKquwzXx5R8w7aS148LzgeDlqWZs",
    name: "Not Depresing music",
    type: "Emotional Damage - Album"
}

const ProfileMusicList = () => {
    const [myMusic, setMyMusic] = useState<UserType[]>([]);
    useEffect(() => {
        (async function fetchUsers() {
            const usersFetched = await fetchData("users") as UserType[];
            setMyMusic(usersFetched);
        }());
    }, [])
    return (
        <div className='profileMusic-container'>
            <h3>My Music</h3>
            <div className='music-list-container'>
                <GroupItem imageUrl={test.imageUrl} name={test.name} type={test.type} />
            </div>
        </div>
    )
}
export default ProfileMusicList
