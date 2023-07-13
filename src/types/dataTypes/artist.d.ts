import { GenreTypes } from "./genre";
export interface ArtistType {
    id: string,
    name: string,
    genres: GenreTypes[],
    popularity: number,
    imageUrl: string,
    albums: AlbumInfo[],  // AÑADIMOS LA IMAGEN?!!??!
    tracks: TrackInfo[]  //TRACK ENTERO ?!?!!?!?!?
    // type: LISTTYPE     !!!!!
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
    artistName: string
}


