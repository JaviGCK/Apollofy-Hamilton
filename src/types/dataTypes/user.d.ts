import { TrackInfo } from "./artist"

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    playlists: PlaylistInfo[],
    likedTracks: TrackInfo[]
}

interface PlaylistInfo {
    playlistId: string,
    playlistName: string
}