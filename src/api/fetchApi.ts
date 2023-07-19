import { AlbumType } from "../types/dataTypes/album";
import { ArtistType } from "../types/dataTypes/artist";
import { PossibleItems } from "../types/dataTypes/enums";
import { GenreType } from "../types/dataTypes/genre";
import { PlaylistType } from "../types/dataTypes/playlist";
import { TopTrends } from "../types/dataTypes/topTrends";
import { UserType } from "../types/dataTypes/user";



export const fetchData = async (data: string): Promise<GenreType[] | UserType[] | TopTrends | AlbumType[] | PlaylistType[] | ArtistType[] | AlbumType | PlaylistType | ArtistType> => {
    const response = await fetch(`http://localhost:3001/${data}`);
    const dataFetched = await response.json();
    return dataFetched;
}



export const getUserListsReferences = async (userEmail: string): Promise<any> => {
    const response = await fetch(`http://localhost:3001/users?email=${userEmail}`);
    const dataFetched = await response.json();
    return dataFetched

}


export const getListByReference = async (type: string, id: string): Promise<any> => {

    const response = await fetch(`http://localhost:3001/${type}s/${id}`);
    const dataFetched = await response.json();
    return dataFetched

}