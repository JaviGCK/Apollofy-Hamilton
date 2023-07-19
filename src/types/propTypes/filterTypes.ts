
export type FilterCategories = {
    name: string
    id: string
    filter: CollectionFilters
}

export enum CollectionFilters {
    ALL = "all",
    PLAYLISTS = "playlist",
    ALBUMS = "album",
    ARTISTS = "artist"
}