import { ArtistType } from "./artist";
import { GenreTypes } from "./enums";
import { AlbumType } from "./album";

/**
 * album hacerlo ?, ya que cuando tracks está dentro de álbum
 * no queremos que se vea, ya esta contenido en éste
 */

export interface TrackType {
    id: string,
    name: string,
    artists: ArtistType[],
    genre: GenreTypes[],
    liked: number,
    url: string,
    // It can be none or different albums
    album: AlbumType[],
    imageUrl: string
}

/**
 * No le pasamos el objeto entero del artista, ya que dentro del artista,
 * en la variable de album ya están todos los tracks como objeto y se vuelve circular todo.
 */
