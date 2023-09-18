import { createContext, useState } from "react";
import { UserType } from "../components/profileChart/ProfileChart";


export const selectedUserContext = createContext<{ selectedUser: UserType | null, changeSelectedUser: (newUser: UserType) => void }>({ selectedUser: null, changeSelectedUser: () => { } });

export const SelectedUserContextProvider = ({ ...props }) => {
    const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

    const changeSelectedUser = (newUser: UserType) => {
        setSelectedUser(newUser)
    }
    return (
        <selectedUserContext.Provider value={{ selectedUser, changeSelectedUser }}>
            {props.children}
        </selectedUserContext.Provider>
    )
}
