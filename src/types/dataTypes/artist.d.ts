
export interface ArtistType {
    id: number,
    name: string,
    genres: GenreTypes,
    popularity: number,
    photoUrl: string,
    albums: AlbumType[],
    tracks: TrackType[]
}


enum GenreTypes {
    hipHop = "hip-hop",
    rock = "rock",
    pop = "pop",
    rB = "r&b",
    metal = "metal",
    techno = "techno",
    funk = "funk",
    reggae = "reggae",
    country = "country",
    classical = "classical"
}