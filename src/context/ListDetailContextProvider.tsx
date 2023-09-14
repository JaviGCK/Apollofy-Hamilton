import { createContext, useState } from "react";
import { ListDetailPossibleItems } from "../types/dataTypes/enums";

interface listDetailContextType {
    listDetail: ListDetailPossibleItems | null,
    setNewListDetail: (newListDetail: ListDetailPossibleItems) => void

}

export const listDetailContext = createContext<listDetailContextType>({ listDetail: null, setNewListDetail: () => { } });

export const ListDetailContextProvider = ({ ...props }) => {
    const [listDetail, setListDetail] = useState<ListDetailPossibleItems | null>(null);

    const setNewListDetail = (newListDetail: ListDetailPossibleItems) => {
        setListDetail(newListDetail);
    }

    return (
        <listDetailContext.Provider value={{ listDetail, setNewListDetail }}>
            {props.children}
        </listDetailContext.Provider>
    )
}
