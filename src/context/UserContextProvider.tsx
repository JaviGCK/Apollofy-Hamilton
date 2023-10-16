import { createContext, useState } from "react"
import { UserType } from "../components/profileChart/ProfileChart";

interface UserContextType {
    currentUser: UserType | null,
    setCurrentLoggedUser: (loggedUser: UserType) => void,
    changedUserData: boolean,
    setChangedUserData: (isChanged: boolean) => void
}


export const userContext = createContext<UserContextType>({ currentUser: null, setCurrentLoggedUser: () => { }, changedUserData: false, setChangedUserData: () => { } })


export const UserContextProvider = ({ ...props }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const [changedUserData, setUserData] = useState<boolean>(false)
    const setCurrentLoggedUser = (loggedUser: UserType) => {
        setCurrentUser(loggedUser);
    }
    const setChangedUserData = (isChanged: boolean) => {
        setUserData(isChanged)
    }
    return (
        <userContext.Provider value={{ currentUser, setCurrentLoggedUser, changedUserData, setChangedUserData }}>
            {props.children}
        </userContext.Provider>
    )
}
