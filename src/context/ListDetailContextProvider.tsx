import { createContext, useState } from "react";
import { PossibleItems } from "../types/dataTypes/enums";


interface listDetailContextType {
    listDetail: PossibleItems | null,
    setNewListDetail: (newListDetail: PossibleItems) => void
}

export const listDetailContext = createContext<listDetailContextType>({ listDetail: null, setNewListDetail: () => { } });

export const ListDetailContextProvider = ({ ...props }) => {
    const [listDetail, setListDetail] = useState<PossibleItems | null>(null);

    const setNewListDetail = (newListDetail: PossibleItems) => {
        setListDetail(newListDetail);
    }

    return (
        <listDetailContext.Provider value={{ listDetail, setNewListDetail }}>
            {props.children}
        </listDetailContext.Provider>
    )
}