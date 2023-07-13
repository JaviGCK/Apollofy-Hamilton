

// LE AÑADIMOS BTN COLORSSS !!!
export interface GenreType {
    id: string,
    name: GenreTypes,
    imageUrl: string,
    btnColor: string
}

export enum GenreTypes {
    HIPHOP = "hip-hop",
    ROCK = "rock",
    POP = "pop",
    RB = "r&b",
    METAL = "metal",
    PUNK = "punk",
    DANCE = "dance",
    RAP = "rap",
    DRILL = "drill",
    URBAN = "urban"
}
