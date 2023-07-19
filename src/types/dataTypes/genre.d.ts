import { GenreTypes } from "./enums"

export interface GenreType {
    id: string,
    name: GenreTypes,
    imageUrl: string,
    btnColor: string,
    setFocus: (value: boolean) => boolean
    setCustomFilter: (value: boolean) => boolean
    setSearchInput: (value: string) => any
}
