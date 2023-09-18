import { GenreTypes, ListType } from "./enums"
import { TrackType } from "./track"

export interface GenreType {
    id: string,
    name: GenreTypes,
    imageUrl: string,
    tracks?: TrackType[],
    color: string,
    listType?: ListType.GENRE
}
