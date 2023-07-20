import { useContext } from "react"
import { userContext } from "../context/UserContextProvider"


export const useUserContext = () => useContext(userContext);