import { PlaylistsType } from "./playlist"
import { TrackType } from "./track"

export interface UserType {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    playlists: PlaylistsType[],
    likedTracks: TrackType[]
}