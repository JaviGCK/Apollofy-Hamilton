import { ListType } from "./enums";
import { TrackType } from "./track";
import { ArtistInfo } from "./track";

export interface AlbumType {
    id: string,
    name: string,
    imageUrl: string,
    tracks: SimpleTrackType[],
    artistId: ArtistInfo[],
    type: ListType
}

interface SimpleTrackType {
    trackName: string,
    url: string
}
