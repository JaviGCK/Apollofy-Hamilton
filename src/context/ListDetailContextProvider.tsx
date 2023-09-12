import { createContext, useState, useRef } from "react";
import { ListDetailPossibleItems } from "../types/dataTypes/enums";

interface listDetailContextType {
    listDetail: ListDetailPossibleItems | null,
    setNewListDetail: (newListDetail: ListDetailPossibleItems) => void
    playBtnRef?: any
}

export const listDetailContext = createContext<listDetailContextType>({ listDetail: null, setNewListDetail: () => { } });

export const ListDetailContextProvider = ({ ...props }) => {
    const [listDetail, setListDetail] = useState<ListDetailPossibleItems | null>(null);

    const setNewListDetail = (newListDetail: ListDetailPossibleItems) => {
        setListDetail(newListDetail);
    }
    const playBtnRef = useRef(null)
    return (
        <listDetailContext.Provider value={{ listDetail, setNewListDetail, playBtnRef }}>
            {props.children}
        </listDetailContext.Provider>
    )
}
