import { useState, useEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { useTrackListContext } from "../../utils/hooks/useTrackListContext"
import { TrackType } from "../../types/track"
import { useIsPlayingContext } from "../../utils/hooks/useIsPlayingContext"




export const SoundBar = () => {
    const { trackList, audioElement } = useTrackListContext();
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTrack, setCurrentTrack] = useState<TrackType | null>(null)
    const [loopActive, setLoopActive] = useState(false)
    const { isPlayingList } = useIsPlayingContext();

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


    }, [isPlaying, currentTrack])

    useEffect(() => {
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

