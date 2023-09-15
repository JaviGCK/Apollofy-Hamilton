import { useContext } from "react"
import { isPlayingContext } from "../../context/IsPlayingContextProvider"

export const useIsPlayingContext = () => {
    return useContext(isPlayingContext)
}