import { CollectionFilters, FilterCategories } from "../types/propTypes/filterTypes";

export const listsFilterCategories: FilterCategories[] = [
    {
        name: "All",
        id: "1",
        filter: CollectionFilters.ALL
    },
    {
        name: "Playlists",
        id: "2",
        filter: CollectionFilters.PLAYLISTS
    },
    {
        name: "Albums",
        id: "3",
        filter: CollectionFilters.ALBUMS
    },
    {
        name: "Artists",
        id: "4",
        filter: CollectionFilters.ARTISTS
    },
]