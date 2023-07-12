import { PossibleItems } from "../../types/dataTypes/enums"
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"

export const TrendList = (props: any) => {
    const trendItemArray = props.conjunto
    return (
        <div className="trendlist-container">
            {

                trendItemArray.map((element: PossibleItems) => {
                    return (
                        <TrendItem key={element.id} item={element} />
                    )
                })
            }
        </div>
    )
}
