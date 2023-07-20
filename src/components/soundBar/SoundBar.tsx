import { useState, useRef, useEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { useTrackListContext } from "../../hooks/useTrackListContext"
import { TrackType } from "../../types/dataTypes/track"




export const SoundBar = () => {
    const { trackList } = useTrackListContext();
    // const [trackList, setTrackList] = useState(testMusic)

    // const [newTrackList, setNewTrackList] = useState<TrackType[]>([])



    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
    const [loopActive, setLoopActive] = useState(false)

    useEffect(() => {
        if (trackList !== null) setCurrentTrack(trackList[0])
    }, [trackList])

    const audioElement = useRef<HTMLAudioElement | null>(null)

    const getTrackProgress = () => {
        if (audioElement.current && trackList !== null && currentTrack !== null) {

            const trackDuration = audioElement.current.duration
            const currentTrackProgress = audioElement.current.currentTime
            console.log(audioElement.current);
            console.log(currentTrackProgress);
            // console.log(trackDuration)
            // console.log(currentTrackProgress)
            setCurrentTrack({
                ...currentTrack,
                progress: currentTrackProgress / trackDuration * 100,
                duration: trackDuration
            })


            if (audioElement.current.currentTime === audioElement.current.duration) {

                handleNextTrack()

                if (currentTrack.name !== trackList[trackList.length - 1].name || loopActive) audioElement.current.play()
                else setIsPlaying(false)

            }
        }



    }

    const handlePrevTrack = () => {

        if (audioElement.current === null || trackList === null || currentTrack === null) return

        const index = trackList.findIndex((x: any) => x.name === currentTrack.name)

        // console.log(index)
        if (index === 0 && trackList !== null) {
            // const prevTrack = trackList[trackList.length - 1];
            // prevTrack.progress = 0;

            setCurrentTrack(trackList[trackList.length - 1])
        }
        else {
            setCurrentTrack(trackList[index - 1])
        }

        audioElement.current.currentTime = 0
    }

    const handleNextTrack = () => {

        if (audioElement.current === null || currentTrack === null || trackList === null) return

        const index = trackList.findIndex((x: any) => x.name === currentTrack.name)

        // console.log(index)
        if (index === trackList.length - 1) {
            console.log(trackList[0]);
            setCurrentTrack(trackList[0])
        }
        else {
            console.log(trackList[index + 1]);
            setCurrentTrack(trackList[index + 1])

        }

        audioElement.current.currentTime = 0
    }

    const handleMetaDataLoad = () => {
        if (currentTrack === null) return;
        const trackDuration = audioElement.current?.duration
        console.log(trackDuration);
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
        console.log(currentTrack);
    }, [currentTrack])

    useEffect(() => {
        // setTrackList(testMusic)
        console.log(trackList);
        audioElement.current?.addEventListener("loadedmetadata", handleMetaDataLoad)
        return () => { audioElement.current?.removeEventListener("loadedmetadata", handleMetaDataLoad) }
    }, [trackList])


    return (
        <div>
            <audio src={currentTrack ? currentTrack.url : ""} ref={audioElement} onLoadedMetadata={handleMetaDataLoad} onTimeUpdate={() => getTrackProgress()} />

            <SoundPlayer
                // trackList={trackList}
                // setTrackList={setTrackList}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentTrack={currentTrack}
                setCurrentTrack={setCurrentTrack}
                audioElement={audioElement}
                handlePrevTrack={handlePrevTrack}
                handleNextTrack={handleNextTrack}
                loopActive={loopActive}
                setLoopActive={setLoopActive}
            />
        </div>
    )
}

// export interface SoundPlayerPropTypes {
//     isPlaying: boolean,
//     setIsPlaying: () => void,
//     currentTrack: TrackType,
//     setCurrentTrack: () => void,
//     audioElement: HTMLAudioElement,
//     handlePrevTrack: () => void,
//     handleNextTrack: () => void,
//     loopActive: boolean,
//     setLoopActive: () => void
// }
















// const testMusic = [
//     {
//         name: "Repeat After Me (Interlude)",
//         url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
//         artistName: "Matias LaPara",
//         imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
//     },
//     {
//         name: "SECOND TRACK",
//         url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
//         artistName: "Matias LaPara",
//         imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
//     },
//     {
//         name: "THIRD TRACK",
//         url: "https://res.cloudinary.com/dqdysl9ep/video/upload/v1689331273/APOLLOFY/apollofy_repeat-after-me-The-weeknd.mp3",
//         artistName: "Matias LaPara",
//         imageUrl: "https://i.scdn.co/image/ab67616100005174920dc1f617550de8388f368e"
//     }
// ]