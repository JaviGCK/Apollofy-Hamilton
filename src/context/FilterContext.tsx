import { useState, createContext } from "react"

export enum CollectionFilters {
    ALL = "all",
    PLAYLISTS = "playlist",
    ALBUMS = "album",
    ARTISTS = "artist",
    TRACKS = "track"
}


export const currentFilterContext = createContext<{ currentFilter: CollectionFilters, changeFilter: (filterParam: CollectionFilters) => void }>({ currentFilter: CollectionFilters.ALL, changeFilter: () => { } })


export function FilterProvider({ ...props }) {

    const [currentFilter, setCurrentFilter] = useState<any>(CollectionFilters.ALL)

    const changeFilter = (filterParam: CollectionFilters) => {
        setCurrentFilter(filterParam)
    }

    return (
        <currentFilterContext.Provider value={{ currentFilter, changeFilter }}>
            {props.children}
        </currentFilterContext.Provider>
    )
}