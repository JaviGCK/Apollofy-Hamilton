
import { BsFillPlayCircleFill, BsFillPauseCircleFill } from 'react-icons/bs';
import "./soundPlayer.css"
import { useRef } from 'react';


export const SoundPlayer = ({ ...props }) => {

    const soundBarClickRef = useRef<HTMLDivElement | null>(null)

    const handlePlayPause = () => {
        props.setIsPlaying(!props.isPlaying)
        console.log("handlePlay is working")
    }

    const handleClickNavigation = (event: any) => {
        if (soundBarClickRef.current) {
            let soundBarWidth = soundBarClickRef.current.clientWidth
            let offset: number = event.nativeEvent.offsetX
            let offsetPercentage = offset / soundBarWidth * 100
            props.audioElement.current.currentTime = offsetPercentage / 100 * props.currentTrack.duration

        }
    }

    return (
        <div className="player-container">
            <div>
                <div className="player-title">
                    <p>{props.currentTrack.name}</p>
                </div>
            </div>
            <div className="content-bar">
                <div className="navigation-content-bar" ref={soundBarClickRef} onClick={handleClickNavigation}>
                    <div className="progress-bar" style={{ width: `${props.currentTrack.progress}%`, background: "red", height: "10px" }}>

                    </div>
                </div>
            </div>
            <div className="controls-container">
                <BsFillPlayCircleFill onClick={() => handlePlayPause()} />
            </div>

        </div>
    )
}
