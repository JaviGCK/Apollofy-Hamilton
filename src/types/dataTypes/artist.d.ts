
export interface ArtistType {
    id: string,
    name: string,
    genres: GenreTypes[],
    popularity: number,
    photoUrl: string,
    albums: albumInfo[],
    tracks: trackInfo[]
}

interface albumInfo {
    albumId: string,
    albumName: string
}

export interface trackInfo {
    trackId: string,
    trackName: string
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
    classical = "classical",
    soul = "soul",
    dance = "dance",
    rap = "rap",
    drill = "drill",
    urabn = "urban"

}