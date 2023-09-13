import { createContext, useState } from "react"

export const isPlayingContext = createContext<{ isPlaying: boolean, changeIsPlaying: (playing: boolean) => void }>({ isPlaying: false, changeIsPlaying: () => { } });


export const IsPlayingContextProvider = ({ ...props }) => {

  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const changeIsPlaying = (playing: boolean) => {
    setIsPlaying(playing)
  }
  return (
    <isPlayingContext.Provider value={{ isPlaying, changeIsPlaying }}>
      {props.children}
    </isPlayingContext.Provider>
  )
}
