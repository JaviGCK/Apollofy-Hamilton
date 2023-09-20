import { createContext, useState } from "react";
import { PossibleItems } from "../types/enums";

export type UserLibraryListType = {
    userLibraryList: PossibleItems[] | null,
    changeUserLibraryList: (newPossibleItems: PossibleItems[]) => void
}

export const userLibrayListContext = createContext<UserLibraryListType>({ userLibraryList: null, changeUserLibraryList: () => { } })

export const UserLibraryListContextProvider = ({ ...props }) => {
    const [userLibraryList, setUserLibraryList] = useState<PossibleItems[] | null>(null)

    const changeUserLibraryList = (newPossibleItems: PossibleItems[]) => {
        setUserLibraryList(newPossibleItems);
    }
    return (
        <userLibrayListContext.Provider value={{ userLibraryList, changeUserLibraryList }}>
            {props.children}
        </userLibrayListContext.Provider>
    )
}   