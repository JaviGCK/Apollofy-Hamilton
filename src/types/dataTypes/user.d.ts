import { trackInfo } from "./artist"

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    playlists: playlistInfo[],
    likedTracks: trackInfo[]
}

interface playlistInfo {
    playlistId: string,
    playlistName: string
}