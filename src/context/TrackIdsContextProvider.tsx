import { createContext, useState } from "react";


export const trackIdsContext = createContext<{ trackIds: string[], changeTrackIds: (newTrackIds: string[]) => void }>({ trackIds: [], changeTrackIds: () => { } });


export const TrackIdsContextProvider = ({ ...props }) => {
    const [trackIds, setTrackIds] = useState<string[]>([]);

    const changeTrackIds = (newTrackIds: string[]) => {
        setTrackIds(newTrackIds);
    }

    return (
        <trackIdsContext.Provider value={{ trackIds, changeTrackIds }}>
            {props.children}
        </trackIdsContext.Provider>
    )
}