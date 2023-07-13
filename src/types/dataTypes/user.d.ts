import { TrackInfo } from "./artist"
import { PossibleItems } from "./enums"

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    playlists: PlaylistInfo[],
    libraryList: PossibleItems[],
}

interface PlaylistInfo {
    playlistId: string,
    playlistName: string
}