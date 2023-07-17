import { AlbumType } from "./album";
import { ArtistType } from "./artist";
import { PlaylistType } from "./playlist";

export interface TopTrends {
    topArtists: ArtistType[],
    topAlbums: AlbumType[],
    topPlaylists: PlaylistType[]
}

// topAlbums will have the complete object since it does not change
// however, artis and playlist objects changes often and will only come with
// id, name and type