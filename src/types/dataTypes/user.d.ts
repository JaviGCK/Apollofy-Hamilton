import { PossibleItems } from "./enums";


export interface UserType {
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    profilePicture?: string,
    isLoggedIn?: boolean,
    libraryList?: PossibleItems[],
}

/**
 * libraryList -> on the playlist and artists objects only the id's, name's and type
 * are kept since they keep changing and storing them would mean PATCH twice, thrice or more depending on
 * how many users got the playlist or artist.
 * However, the album is unchangeable.
 */