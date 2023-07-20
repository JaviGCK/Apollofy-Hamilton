import { GenreTypes, ListType } from "./enums"

export interface GenreType {
    id: string,
    name: GenreTypes,
    imageUrl: string,
    btnColor: string,
    type?: ListType.GENRE
}
