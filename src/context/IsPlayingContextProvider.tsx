import { createContext, useState } from "react"

export const isPlayingContext = createContext<{ isPlayingList: boolean, isListBtnActive: boolean, changeIsPlayingList: (playing: boolean) => void, changeIsBtnActive: (playing: boolean) => void }>({ isPlayingList: false, isListBtnActive: false, changeIsPlayingList: () => { }, changeIsBtnActive: () => { } });


export const IsPlayingContextProvider = ({ ...props }) => {

  const [isPlayingList, setIsPlayingList] = useState<boolean>(false)

  const [isListBtnActive, setIsListBtnActive] = useState<boolean>(false)

  const changeIsPlayingList = (playing: boolean) => {
    setIsPlayingList(playing)
  }
  const changeIsBtnActive = (playing: boolean) => {
    setIsListBtnActive(playing)
  }

  return (
    <isPlayingContext.Provider value={{ isPlayingList, isListBtnActive, changeIsPlayingList, changeIsBtnActive }}>
      {props.children}
    </isPlayingContext.Provider>
  )
}
