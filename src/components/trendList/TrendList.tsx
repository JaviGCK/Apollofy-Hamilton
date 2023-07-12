import { PossibleItems } from "../../types/dataTypes/enums"
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"


export const TrendList = (conjunto: any) => {
    return (
        <>
            {conjunto.map((element: PossibleItems) => {
                return (
                    <TrendItem item={element} />
                )
            })}
        </>
    )
}
