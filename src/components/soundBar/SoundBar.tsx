import { useState, useRef, useEffect, useLayoutEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { CurrentTrack } from "../../types/propTypes/soundBarTypes"


const testMusic = [
    {
        name: "Repeat After Me (Interlude)",
        url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
        artistName: "Matias LaPara",
        imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
    },
    {
        name: "SECOND TRACK",
        url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
        artistName: "Matias LaPara",
        imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
    },
    {
        name: "THIRD TRACK",
        url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
        artistName: "Matias LaPara",
        imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
    }
]

export const SoundBar = () => {

    const [trackList, setTrackList] = useState(testMusic)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<CurrentTrack>(testMusic[0])

    const audioElement = useRef<HTMLAudioElement | null>(null)

    const getTrackProgress = () => {
        if (audioElement.current) {

            const trackDuration = audioElement.current.duration
            const currentTrackProgress = audioElement.current.currentTime

            console.log(trackDuration)
            console.log(currentTrackProgress)
            setCurrentTrack({
                ...currentTrack,
                progress: currentTrackProgress / trackDuration * 100,
                duration: trackDuration
            })
        }

    }

    const handleMetaDataLoad = () => {
        const trackDuration = audioElement.current?.duration
        setCurrentTrack({
            ...currentTrack,
            progress: 0,
            duration: trackDuration
        })
    }

    useEffect(() => {
        if (isPlaying && audioElement.current) audioElement.current.play()
        else if (!isPlaying && audioElement.current) audioElement.current.pause()


    }, [isPlaying])

    useEffect(() => {
        setTrackList(testMusic)
        audioElement.current?.addEventListener("loadedmetadata", handleMetaDataLoad)
        return () => { audioElement.current?.removeEventListener("loadedmetadata", handleMetaDataLoad) }
    }, [])


    return (
        <div>
            <audio src={currentTrack.url} ref={audioElement} onTimeUpdate={() => getTrackProgress()} />
            <SoundPlayer
                trackList={trackList}
                setTrackList={setTrackList}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                audioElement={audioElement}
            />
        </div>
    )
}
