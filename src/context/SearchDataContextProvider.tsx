import { createContext, useState } from "react"
import { AlbumType } from "../types/album"
import { PlaylistType } from "../types/playlist"
import { ArtistType } from "../types/artist"
import { UserType } from "../components/profileChart/ProfileChart"
import { TrackType } from "../types/track"

export type DataRetrievedType = {
    albums: AlbumType[],
    playlists: PlaylistType[],
    tracks: TrackType[],
    artists: ArtistType[],
    users: UserType[]
}

type ContextDataRetrievedType = {
    dataRetrieved: DataRetrievedType | null,
    changeDataRetrieved: (newDataContext: DataRetrievedType) => void
}
export const searchDataContext = createContext<ContextDataRetrievedType>({ dataRetrieved: null, changeDataRetrieved: () => { } })

const SearchDataContextProvider = ({ ...props }) => {
    const [dataRetrieved, setDataRetrieved] = useState<DataRetrievedType | null>(null)
    const changeDataRetrieved = (newDataContext: DataRetrievedType) => {
        setDataRetrieved(newDataContext)
    }
    return (
        <searchDataContext.Provider value={{ dataRetrieved, changeDataRetrieved }}>
            {props.children}
        </searchDataContext.Provider>
    )
}

export default SearchDataContextProvider