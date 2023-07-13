import { TrackInfo } from "./artist";


// PARECE QUE PERFECTO, ES ASÍ ??
export interface PlaylistsType {
    id: string,
    name: string,
    isFollowed: boolean,
    // If owner is app, then owner = "Apollofy"
    // If owner is user, then owner = userName
    owner: string,
    imageUrl: string,
    description: string,
    tracks: TrackInfo[],
    // type: LISTTYPE     !!!!!
}
