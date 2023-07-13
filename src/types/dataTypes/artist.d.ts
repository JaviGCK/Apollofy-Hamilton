<<<<<<< HEAD
import { ListType } from "./enums"
=======
import { GenreTypes } from "./genre";

// ARTISTS: cambiar y en tracks meter el objeto entero.
// porque vamos a necesitar la img y puede ser de más de un artista
// entonces para eso, le pasamos el objeto enetero y evitamos request inncesarias
// Meterle también una imágen al álbum!!!
/**
 * USERS: quitamos playlist y likedtracks y añadimos libraryItems, biblioteca
 * con playlist favoritas, artistas, plasylist con tracks favoritos etc. Puede ser de
 * 3 tipos que son libraryTypes
 * TRACKS: el álbum debe tener una img as well
 * PLAYLIST: en la parte de tracks, pasar el track entero, o al menos, meter la img
 * ALBUM: pasar el track entero igual que antes
 */
>>>>>>> 1998ca02a1f001249782bf983c5cfe8c724ef9da

export interface ArtistType {
    id: string,
    name: string,
    genres: GenreTypes[],
    popularity: number,
    imageUrl: string,
<<<<<<< HEAD
    albums: AlbumInfo[],
    tracks: TrackInfo[],
    type: ListType
=======
    albums: AlbumInfo[],  // AÑADIMOS LA IMAGEN?!!??!
    tracks: TrackInfo[]  //TRACK ENTERO ?!?!!?!?!?
    // type: LISTTYPE     !!!!!
>>>>>>> 1998ca02a1f001249782bf983c5cfe8c724ef9da
}

interface AlbumInfo {
    //img del album
    albumId: string,
    albumName: string
}


// VER SI PONEMOS EL TRACK ENTERO!!!!!!!
// Y QUITAR ESTA COSA ?!?!?
export interface TrackInfo {
    trackId: string,
    trackName: string,
    url: string,
    albumName: string,
    // Es array de string por si hay más de un artista!!
    // cambiar en artista y en playlist
    artistName: string[]
}


