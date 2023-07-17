import { ListType } from "./enums";
import { TrackType } from "./track";
export interface PlaylistType {
    id: string,
    name: string,
    isFollowed: boolean,
    // If owner is app, then owner = "Apollofy"
    // If owner is user, then owner = userName
    owner: string,
    imageUrl: string,
    description: string,
    tracks: TrackType[],
    type: ListType
}
