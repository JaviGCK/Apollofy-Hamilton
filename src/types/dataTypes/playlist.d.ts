import { trackInfo } from "./artist";
import { TrackType } from "./track";

export interface PlaylistsType {
    id: string,
    name: string,
    isFollowed: boolean,
    // If owner is app, then owner = "Apollofy"
    // If owner is user, then owner = userName
    owner: string,
    thumbnail: string,
    description: string,
    tracks: trackInfo[]
}
