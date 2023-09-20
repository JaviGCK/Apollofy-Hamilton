import { ListType } from "./enums";
import { TrackType } from "./track";
export interface PlaylistType {
    id: string,
    name?: string,
    imageUrl?: string,
    tracks?: TrackType[],
    description?: string,
    owner?: string,
    privacity?: boolean,
    listType?: ListType,
    usersId?: string
}

// If owner is app, then owner = "Apollofy"
// If owner is user, then owner = userName
