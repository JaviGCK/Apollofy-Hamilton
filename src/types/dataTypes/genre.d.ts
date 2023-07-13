
export interface GenreType {
    id: string,
    name: GenreTypes,
    imageUrl: string,
    btnColor: string
}

export enum GenreTypes {
    hipHop = "hip-hop",
    rock = "rock",
    pop = "pop",
    rB = "r&b",
    metal = "metal",
    punk = "punk",
    dance = "dance",
    rap = "rap",
    drill = "drill",
    urban = "urban"
}
