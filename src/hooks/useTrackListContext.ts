import { useContext } from "react";
import { trackListContext } from "../context/TrackListContextProvider";

export const useTrackListContext = () => useContext(trackListContext);