import { TrackType } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: TrackType[],
    artistId: string
}