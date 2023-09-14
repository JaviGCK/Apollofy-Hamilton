import { createContext, useState } from "react"


type isPlayingContextType = {
  isPlayingList: boolean,
  isListBtnActive: boolean,
  listId: string | null,
  changeIsPlayingList: (playing: boolean) => void,
  changeIsBtnActive: (playing: boolean) => void,
  changeListId: (newId: string) => void
}


export const isPlayingContext = createContext<isPlayingContextType>({ isPlayingList: false, isListBtnActive: false, listId: "", changeIsPlayingList: () => { }, changeIsBtnActive: () => { }, changeListId: () => { } });


export const IsPlayingContextProvider = ({ ...props }) => {

  const [isPlayingList, setIsPlayingList] = useState<boolean>(false)

  const [isListBtnActive, setIsListBtnActive] = useState<boolean>(false)

  const [listId, setListId] = useState<string | null>(null);

  const changeIsPlayingList = (playing: boolean) => {
    setIsPlayingList(playing)
  }
  const changeIsBtnActive = (playing: boolean) => {
    setIsListBtnActive(playing)
  }
  const changeListId = (newId: string) => {
    setListId(newId);
  }

  return (
    <isPlayingContext.Provider value={{ isPlayingList, isListBtnActive, listId, changeIsPlayingList, changeIsBtnActive, changeListId }}>
      {props.children}
    </isPlayingContext.Provider>
  )
}
