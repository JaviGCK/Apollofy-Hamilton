import { useState, useEffect } from "react"
import "./soundBar.css"
import { SoundPlayer } from "./soundPlayer/SoundPlayer"
import { useTrackListContext } from "../../utils/hooks/useTrackListContext"
import { useIsPlayingContext } from "../../utils/hooks/useIsPlayingContext"
import { TrackType } from "../../types/track"




export const SoundBar = () => {
    const { trackList, audioElement } = useTrackListContext();
    const [loopActive, setLoopActive] = useState(false)
    const { isPlayingList, currentTrack, changeIsPlayingList, changeCurrentTrack } = useIsPlayingContext();
    const [currentTrackInfo, setCurrentTrackInfo] = useState<TrackType | null>(null);

    useEffect(() => {
        if (trackList !== null) {
            changeCurrentTrack(trackList[0])
            setCurrentTrackInfo(trackList[0])
        }
    }, [trackList])



    const getTrackProgress = () => {
        if (audioElement.current && trackList !== null && currentTrack !== null) {

            const trackDuration = audioElement.current.duration
            const currentTrackProgress = audioElement.current.currentTime

            setCurrentTrackInfo({
                ...currentTrack,
                progress: currentTrackProgress / trackDuration * 100,
                duration: trackDuration
            })

            if (audioElement.current.currentTime === audioElement.current.duration) {
                handleNextTrack()
                if (currentTrack.name !== trackList[trackList.length - 1].name || loopActive) audioElement.current.play()
                else changeIsPlayingList(false)
            }
        }
    }

    const handlePrevTrack = () => {
        if (audioElement.current === null || trackList === null || currentTrack === null) return
        const index = trackList.findIndex((x: any) => x.name === currentTrack.name)
        if (index === 0 && trackList !== null) {
            changeCurrentTrack(trackList[trackList.length - 1])
        }
        else {
            changeCurrentTrack(trackList[index - 1])
        }
        audioElement.current.currentTime = 0
    }

    const handleNextTrack = () => {
        if (audioElement.current === null || currentTrack === null || trackList === null) return
        const index = trackList.findIndex((x: any) => x.name === currentTrack.name)
        if (index === trackList.length - 1) {
            changeCurrentTrack(trackList[0])
        }
        else {
            changeCurrentTrack(trackList[index + 1])
        }
        audioElement.current.currentTime = 0
    }

    const handleMetaDataLoad = () => {

        if (currentTrack === null) return;

        const trackDuration = audioElement.current?.duration
        changeCurrentTrack({
            ...currentTrack,
            progress: 0,
            duration: trackDuration
        })
    }


    useEffect(() => {
        if (isPlayingList && audioElement.current) audioElement.current.play()
        else if (!isPlayingList && audioElement.current) audioElement.current.pause()

    }, [isPlayingList, currentTrack])


    return (
        <div>
            <audio src={currentTrackInfo ? currentTrackInfo.audioUrl : ""} ref={audioElement} onLoadedMetadata={handleMetaDataLoad} onTimeUpdate={() => getTrackProgress()} />

            <SoundPlayer
                isPlaying={isPlayingList}
                setIsPlaying={changeIsPlayingList}
                currentTrack={currentTrackInfo}
                setCurrentTrack={setCurrentTrackInfo}
                audioElement={audioElement}
                handlePrevTrack={handlePrevTrack}
                handleNextTrack={handleNextTrack}
                loopActive={loopActive}
                setLoopActive={setLoopActive}
            />
        </div>
    )
}

