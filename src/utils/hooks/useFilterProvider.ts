import { currentFilterContext } from "../../context/FilterContext"
import { useContext } from "react"


export const useFilterContext = () => {
    return useContext(currentFilterContext)
}