import { TrackType } from "./track";

export interface PlaylistsType {
    id: string,
    name: string,
    isFollowed: boolean,
    thumbnail: string,
    description: string,
    tracks: TrackType[]
}