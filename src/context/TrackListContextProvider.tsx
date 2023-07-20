import { createContext, useState } from "react"
import { TrackType } from "../types/dataTypes/track"

type trackListContextTypes = {
    trackList: TrackType[] | null,
    setNewTrackList: (newTrackList: TrackType[]) => void
}

export const trackListContext = createContext<trackListContextTypes>({ trackList: null, setNewTrackList: () => { } })

export const TrackListContextProvider = ({ ...props }) => {
    const [trackList, setTrackList] = useState<TrackType[] | null>(null);
    const setNewTrackList = (newTrackList: TrackType[]) => {
        setTrackList(newTrackList);
    }
    return (
        <trackListContext.Provider value={{ trackList, setNewTrackList }}>
            {props.children}
        </trackListContext.Provider>
    )
}

