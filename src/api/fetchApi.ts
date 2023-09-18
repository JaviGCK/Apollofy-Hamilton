
import { UserDataType } from "../components/navbar/NavBar";
import { UserType } from "../components/profileChart/ProfileChart";
import { TopTrends } from "../components/trendList/TrendList";
import { AlbumType } from "../types/album";
import { ArtistType } from "../types/artist";
import { PossibleItems } from "../types/enums";
import { GenreType } from "../types/genre";
import { PlaylistType } from "../types/playlist";
import { TrackType } from "../types/track";



//--------------------------------------------------------------------------------------------------------------------------------------------

export const fetchData = async (getToken: any, data: string): Promise<GenreType[] | UserType[] | TopTrends | AlbumType[] | PlaylistType[] | ArtistType[] | AlbumType | PlaylistType | ArtistType> => {
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



export const getUserListsReferences = async (getToken: any, userEmail: string): Promise<any> => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}users/${userEmail}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    return dataFetched

}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const getListByReference = async (getToken: any, type: string, id: string): Promise<any> => {
    const { VITE_API_URL: url } = import.meta.env;
    const token = await getToken();
    const response = await fetch(`${url}${type}s/${id}`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    return dataFetched

}



//--------------------------------------------------------------------------------------------------------------------------------------------
export const postTrack = async (getToken: any, formTrackData: FormData, id: string) => {
    // const users = await fetchData("users") as UserType[];
    // const user = users.find(({ email }) => email === userEmail) as UserType;
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

export const getFullTrack = async (getToken: any, tracksById: string[]): Promise<TrackType[]> => {
    const tracks: TrackType[] = [];
    for (const trackId of tracksById) {
        const fullTrack = await fetchData(getToken, `tracks?id=${trackId}`) as TrackType[];
        tracks.push(fullTrack[0])
    }
    return tracks;
}
//--------------------------------------------------------------------------------------------------------------------------------------------

//export const updateUserLList = async (getToken: any, user: UserType, libraryList: PossibleItems[], newItem: PossibleItems) => {
//    const { VITE_API_URL: url } = import.meta.env;
//    const token = await getToken();
//    const response = await fetch(`${url}users/${user.id}`, {
//        method: "PUT",
//        body: JSON.stringify({
//            ...user,
//            libraryList: [...libraryList, newItem]
//        }),
//        headers: {
//            authorization: `Bearer ${token}`,
//            "Content-type": "application/json; charset=UTF-8"
//        }
//    })
//    const dataFetched = await response.json();
//    return dataFetched;
//}

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
    return response
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
