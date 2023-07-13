import { TrackInfo } from "./artist"
import { PossibleItems } from "./enums"


// CAMBIAMOS PLAYLIST POR LIBRARYLIST, YA QUE 
// PUEDE TENER ARTISTA, PLAYLIS, ALBUMES...
// VER COMO HACER !!!
// ELIMINAR LBRARYLIST Y CREAR COMO PLAYLIST
// PARA CADA USUARIO UNA PLAYLIST DE LIKED SONGS


// AÑADIR EN ALBUM, TRACK Y PLAYLIST EL TIPO
// DE DATO QUE ES

export interface UserType {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: string,
    isLoggedIn: boolean,
    playlists: PlaylistInfo[],
    libraryList: PossibleItems[],
    // AÑADIR POR DEFECTO LA PLAYLIST DE ME GUSTA!!
}

// AÑADIR IMAGEN DE LA PLAYLIST!!!!!
interface PlaylistInfo {
    playlistId: string,
    playlistName: string
}