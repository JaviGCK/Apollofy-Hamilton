import { useContext } from "react";
import { trackIdsContext } from "../../context/TrackIdsContextProvider";


export const useTrackIdsContext = () => useContext(trackIdsContext);