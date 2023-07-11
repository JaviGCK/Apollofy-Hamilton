import { TrackType } from "./track";
import { ArtistInfo } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: TrackType[],
    artistId: ArtistInfo[]
}

