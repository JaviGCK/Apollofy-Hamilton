import { TrackType } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: TrackType[],
    artistId: artistInfo[]
}

interface artistInfo {
    artistId: string,
    artistName: string
}