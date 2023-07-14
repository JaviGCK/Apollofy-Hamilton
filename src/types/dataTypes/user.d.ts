import { PossibleItems } from "./enums";


export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    libraryList: PossibleItems[],
    // AÑADIR POR DEFECTO LA PLAYLIST DE ME 
    //     LIKED SONGS!!
}
