import { useState, useRef, useEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { CurrentTrack } from "../../types/propTypes/soundBarTypes"


const testMusic = {
    name: "Repeat After Me (Interlude)",
    url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3"
}

export const SoundBar = () => {

    const [trackList, setTrackList] = useState(testMusic)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(testMusic)

    const audioElement = useRef<HTMLAudioElement | null>(null)

    const getTrackProgress = () => {
        if (audioElement.current) {
            const trackDuration = audioElement.current.duration
            const currentTrackProgress = audioElement.current.currentTime
            setCurrentTrack({
                ...currentTrack,
                "progress": currentTrackProgress / trackDuration * 100,
                "duration": trackDuration
            })
        }

    }
    useEffect(() => {
        if (isPlaying && audioElement.current) audioElement.current.play()
        else if (!isPlaying && audioElement.current) audioElement.current.pause()


    }, [isPlaying])


    return (
        <div>
            <audio src={testMusic.url} ref={audioElement} onTimeUpdate={() => getTrackProgress()} />
            <SoundPlayer trackList={trackList} setTrackList={setTrackList} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentTrack={currentTrack} setCurrentTrack={setCurrentTrack} audioElement={audioElement} />
        </div>
    )
}
