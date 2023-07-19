import { AlbumType } from "../types/dataTypes/album";
import { ArtistType } from "../types/dataTypes/artist";
import { GenreType } from "../types/dataTypes/genre";
import { PlaylistType } from "../types/dataTypes/playlist";
import { TopTrends } from "../types/dataTypes/topTrends";
import { UserType } from "../types/dataTypes/user";

export const fetchData = async (data: string): Promise<GenreType[] | UserType[] | TopTrends | AlbumType[] | PlaylistType[] | ArtistType[] | AlbumType | PlaylistType | ArtistType> => {
    const response = await fetch(`http://localhost:3001/${data}`);
    const dataFetched = await response.json();
    return dataFetched;
}



export const postTrack = async (trackFile: any): Promise<string> => {
    let url = ""
    fetch(`https://api.cloudinary.com/v1_1/dqdysl9ep/auto/upload`, {
        method: 'POST',
        body: trackFile
    })
        .then((response) => response.json())
        .then(data => {
            url = data.url;
            //Hacer un POST en los tracks
        })
    return url
}
