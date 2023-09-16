import { createContext, useState, useRef } from "react"
import { TrackType } from "../types/track"

type trackListContextTypes = {
    trackList: TrackType[] | null,
    setNewTrackList: (newTrackList: TrackType[]) => void
    audioElement?: any
}

export const trackListContext = createContext<trackListContextTypes>({ trackList: null, setNewTrackList: () => { } })

export const TrackListContextProvider = ({ ...props }) => {
    const [trackList, setTrackList] = useState<TrackType[] | null>(null);
    const setNewTrackList = (newTrackList: TrackType[]) => {
        setTrackList(newTrackList);
    }
    const audioElement = useRef<HTMLAudioElement | null>(null)
    return (
        <trackListContext.Provider value={{ trackList, setNewTrackList, audioElement }}>
            {props.children}
        </trackListContext.Provider>
    )
}
