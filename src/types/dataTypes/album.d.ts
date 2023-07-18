
import { ArtistType } from "./artist";
import { ListType } from "./enums";
import { TrackType } from "./track";


export interface AlbumType {
    id: string,
    name?: string,
    imageUrl?: string,
    tracks?: TrackType[],
    artists?: ArtistType[], //just the id and name of the artists
    type?: ListType
}
/**
 * If the album name is the same as the track,
 * and the album's length is 1, then it is a single
 */

