import { ListType, PossibleItems } from "./enums";
import { TrackType } from "./track";


export interface UserType {
    id: string,
    name?: string,
    email?: string,
    profilePicture?: string,
    libraryList?: PossibleItems[],
    type?: ListType,
    tracks?: TrackType[]
}

/**
 * libraryList -> on the playlist and artists objects only the id's, name's and type
 * are kept since they keep changing and storing them would mean PATCH twice, thrice or more depending on
 * how many users got the playlist or artist.
 * However, the album is unchangeable.
 */