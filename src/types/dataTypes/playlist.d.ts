import { TrackInfo } from "./artist";
import { ListType } from "./enums";


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
<<<<<<< HEAD
    type: ListType
=======
    // type: LISTTYPE     !!!!!
>>>>>>> 1998ca02a1f001249782bf983c5cfe8c724ef9da
}
