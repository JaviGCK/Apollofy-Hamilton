
import { UserDataType } from "../components/navbar/NavBar";
import { UserType } from "../components/profileChart/ProfileChart";
import { AlbumType } from "../types/album";
import { ArtistType } from "../types/artist";
import { GenreType } from "../types/genre";
import { PlaylistType } from "../types/playlist";



//--------------------------------------------------------------------------------------------------------------------------------------------

export const fetchData = async (getToken: any, data: string): Promise<GenreType[] | UserType[] | AlbumType[] | PlaylistType[] | ArtistType[] | AlbumType | PlaylistType | ArtistType> => {

    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}${data}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    return dataFetched;

}


//--------------------------------------------------------------------------------------------------------------------------------------------
export const postTrack = async (getToken: any, formTrackData: FormData, id: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}tracks/${id}`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${token}`
        },
        body: formTrackData
    });
    const dataFetched = response.json();
    return dataFetched;
}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const postNewUser = async (getToken: any, newUser: UserDataType): Promise<UserType> => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}users`, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    return dataFetched;
}


//---------------------------------------------------------------------------------------------------------------------------------------------



export const addFavourites = async (getToken: any, userId: string, listType: string, listTypeId: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}favourites/${userId}`, {
        method: 'POST',
        body: JSON.stringify({
            listType: listType,
            listTypeId: listTypeId
        }),
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    return await response.json()
}

export const deleteFavourites = async (getToken: any, favouriteId: string, userId: string): Promise<UserType> => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}favourites/${favouriteId}/${userId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const data: UserType = await response.json();

    return data;
}


export const updateUserFollowing = async (getToken: any, user: UserType, followingId: string, action: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}users/following/${user.id}`, {
        method: "PATCH",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            followingId,
            action,
        }),

    })
    return response;
}

export const deleteTrack = async (getToken: any, trackId: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}tracks/${trackId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return response;
}

export const deleteAlbum = async (getToken: any, albumId: string) => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}albums/${albumId}`, {
        method: 'DELETE',
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    return response;
}