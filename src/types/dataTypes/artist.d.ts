
export interface ArtistType {
    id: string,
    name: string,
    genres: GenreTypes[],
    popularity: number,
    photoUrl: string,
    albums: AlbumInfo[],
    tracks: TrackInfo[]
}

interface AlbumInfo {
    albumId: string,
    albumName: string
}

export interface TrackInfo {
    trackId: string,
    trackName: string
}

enum GenreTypes {
    hipHop = "hip-hop",
    rock = "rock",
    pop = "pop",
    rB = "r&b",
    metal = "metal",
    punk = "punk",
    techno = "techno",
    funk = "funk",
    dance = "dance",
    rap = "rap",
    drill = "drill",
    urban = "urban"

}