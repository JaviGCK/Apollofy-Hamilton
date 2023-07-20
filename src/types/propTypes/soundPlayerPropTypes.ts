import { TrackType } from "../dataTypes/track";

export interface SoundPlayerPropTypes {
    isPlaying: boolean,
    setIsPlaying: (playing: boolean) => void,
    currentTrack: TrackType | null,
    setCurrentTrack: (track: TrackType) => void,
    audioElement: any,
    handlePrevTrack: () => void,
    handleNextTrack: () => void,
    loopActive: boolean,
    setLoopActive: (active: boolean) => void
}