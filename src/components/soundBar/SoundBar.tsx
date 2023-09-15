import { useState, useEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { useTrackListContext } from "../../utils/hooks/useTrackListContext"
import { TrackType } from "../../types/dataTypes/track"
import { useIsPlayingContext } from "../../utils/hooks/useIsPlayingContext"
import { useTrackIdsContext } from "../../utils/hooks/useTrackIdsContext"




export const SoundBar = () => {
    const { trackList, audioElement } = useTrackListContext();
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
    const [loopActive, setLoopActive] = useState(false)
    const { isPlayingList, changeIsBtnActive } = useIsPlayingContext();
    const { trackIds } = useTrackIdsContext();

    useEffect(() => {
        if (trackList !== null) {
            setCurrentTrack(trackList[0])
        }
    }, [trackList])



    const getTrackProgress = () => {
        if (audioElement.current && trackList !== null && currentTrack !== null) {

            const trackDuration = audioElement.current.duration
            const currentTrackProgress = audioElement.current.currentTime

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
        if (index === 0 && trackList !== null) {
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
        if (index === trackList.length - 1) {
            setCurrentTrack(trackList[0])
        }
        else {
            setCurrentTrack(trackList[index + 1])
        }
        audioElement.current.currentTime = 0
    }

    const handleMetaDataLoad = () => {

        if (currentTrack === null) return;

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
        // changeIsPlayingList(isPlaying)
        //Si se cambia el play del soundbar, tmb lo debería de hacer el play
        // de list detail. Y para hacerlo debería de ver si la tracklist del soundbar
        // es la misma que los trackIds, es decir, si la tracklist coincide con el 
        // detail list que se está enseñando por pantalla

        if (isPlaying) {
            if (trackList === null) return;
            let coincides = true;
            let soundPlayerIds = trackList.map((track) => track.id)
            if (soundPlayerIds.length === trackIds.length) {
                for (let i = 0; i < trackIds.length - 1; i++) {
                    if (!soundPlayerIds.includes(trackIds[i])) {
                        coincides = false
                    }
                }
            } else { coincides = false }
            coincides ? changeIsBtnActive(isPlaying) : changeIsBtnActive(!isPlaying)
        }


    }, [isPlaying, currentTrack])

    useEffect(() => {
        //Si se cambia isPlayingList, pues isPlaying también debería de cambiar
        setIsPlaying(isPlayingList);
    }, [isPlayingList])


    return (
        <div>
            <audio src={currentTrack ? currentTrack.audioUrl : ""} ref={audioElement} onLoadedMetadata={handleMetaDataLoad} onTimeUpdate={() => getTrackProgress()} />

            <SoundPlayer
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
