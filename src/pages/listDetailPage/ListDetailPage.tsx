import './listDetailPage.css'
import { FaAngleLeft } from "react-icons/fa"
import { AiOutlinePlusCircle } from "react-icons/ai"
import { BiSolidHeart, BiPlay } from "react-icons/bi"
import { useEffect, useState } from "react"
import { PossibleItems } from "../../types/dataTypes/enums"
import { GroupItem } from "../../components/lists/groupItem/GroupItem"


export const ListDetailPage = () => {

    const test = {
        imageUrl: "https://play-lh.googleusercontent.com/rKLMwthaxMG2wXoSRI7gyuoZWkuIUagkFhRh4pFWqKquwzXx5R8w7aS148LzgeDlqWZs",
        name: "Not Depresing music",
        type: "Emotional Damage - Album"
    }
    const [result, setResult] = useState([])

    useEffect(() => {
        const api = async () => {
            const data = await fetch("http://localhost:3001/albums")
            const result = await data.json()
            setResult(result)
        }
        api()

    }, [])

    return (
        <div className="list-detail-page-container">
            <div className="list-detail-heading">
                <FaAngleLeft className="list-detail-angle-btn" />
                <img className="list-detail-img"src={test.imageUrl} alt={`Image or Cover of ${test.name}`} />
                <div className="list-detail-dashboard">
                    <AiOutlinePlusCircle className="list-detail-add-btn" />
                    <BiSolidHeart className="list-detail-heart-btn" />
                    <span className="list-detail-container-play-btn">
                        <BiPlay className="list-detail-play-btn" />
                    </span>
                </div>

            </div>
            <div className='list-detail-container-items'>
            {result.map((group: PossibleItems) => {
                return (
                    <GroupItem list={group} key={group.id} />
                )
            })}
            </div>
        </div>
    )
}
