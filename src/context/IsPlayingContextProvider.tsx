import { createContext, useState } from "react"
import { TrackType } from "../types/track";


type isPlayingContextType = {
  isPlayingList: boolean,
  isListBtnActive: boolean,
  lastBtnActiveId: string | null,
  currentTrack: TrackType | null,
  changeIsPlayingList: (playing: boolean) => void,
  changeIsBtnActive: (playing: boolean) => void,
  changeLastBtnActiveId: (newId: string) => void,
  changeCurrentTrack: (newTrack: TrackType) => void
}


export const isPlayingContext = createContext<isPlayingContextType>({ isPlayingList: false, isListBtnActive: false, lastBtnActiveId: null, currentTrack: null, changeIsPlayingList: () => { }, changeIsBtnActive: () => { }, changeLastBtnActiveId: () => { }, changeCurrentTrack: () => { } });


export const IsPlayingContextProvider = ({ ...props }) => {

  const [isPlayingList, setIsPlayingList] = useState<boolean>(false);

  const [isListBtnActive, setIsListBtnActive] = useState<boolean>(false);

  const [lastBtnActiveId, setLastBtnActiveId] = useState<string | null>(null);

  const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null);

  const changeIsPlayingList = (playing: boolean) => {
    setIsPlayingList(playing)
  }
  const changeIsBtnActive = (playing: boolean) => {
    setIsListBtnActive(playing)
  }
  const changeLastBtnActiveId = (newId: string) => {
    setLastBtnActiveId(newId);
  }
  const changeCurrentTrack = (newTrack: TrackType) => {
    setCurrentTrack(newTrack);
  }

  return (
    <isPlayingContext.Provider value={{ isPlayingList, isListBtnActive, lastBtnActiveId, currentTrack, changeIsPlayingList, changeIsBtnActive, changeLastBtnActiveId, changeCurrentTrack }}>
      {props.children}
    </isPlayingContext.Provider>
  )
}
