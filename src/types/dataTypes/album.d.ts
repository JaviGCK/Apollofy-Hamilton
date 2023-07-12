import { TrackType } from "./track";
import { ArtistInfo } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: SimpleTrackType[],
    artistId: ArtistInfo[]
}

interface SimpleTrackType {
    trackName: string,
    url: string
}
