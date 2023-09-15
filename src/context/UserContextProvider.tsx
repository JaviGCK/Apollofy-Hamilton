import { createContext, useState } from "react"
import { UserType } from "../components/profileChart/ProfileChart";




export const userContext = createContext<{ currentUser: UserType | null, setCurrentLoggedUser: (loggedUser: UserType) => void }>({ currentUser: null, setCurrentLoggedUser: () => { } });

export const UserContextProvider = ({ ...props }) => {
    const [currentUser, setCurrentUser] = useState<UserType | null>(null);
    const setCurrentLoggedUser = (loggedUser: UserType) => {
        setCurrentUser(loggedUser);
    }
    return (
        <userContext.Provider value={{ currentUser, setCurrentLoggedUser }}>
            {props.children}
        </userContext.Provider>
    )
}
