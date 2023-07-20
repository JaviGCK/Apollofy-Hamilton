import { AlbumType } from "../types/dataTypes/album";
import { ArtistType } from "../types/dataTypes/artist";
import { GenreTypes } from "../types/dataTypes/enums";
import { GenreType } from "../types/dataTypes/genre";
import { PlaylistType } from "../types/dataTypes/playlist";
import { TopTrends } from "../types/dataTypes/topTrends";
import { TrackType } from "../types/dataTypes/track";
import { UserType } from "../types/dataTypes/user";


//--------------------------------------------------------------------------------------------------------------------------------------------

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
//--------------------------------------------------------------------------------------------------------------------------------------------

export const postDataCloud = async (dataForm: FormData): Promise<string> => {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/auto/upload`, {
        method: 'POST',
        body: dataForm
    })
    const dataFetched = await response.json();
    return dataFetched.url;
}



//--------------------------------------------------------------------------------------------------------------------------------------------
export const postTrackServer = async (userEmail: string, trackUrl: string, trackId: string, trackTitle: string, trackImg: string, trackPrivacy: boolean, trackGenre: GenreTypes): Promise<void> => {
    // const users = await fetchData("users") as UserType[];
    // const user = users.find(({ email }) => email === userEmail) as UserType;

    const user = await getUserByEmail(userEmail);

    const userTracks = user.tracks as TrackType[];
    const newTrack = getNewTrack(user.id, trackUrl, trackId, trackTitle, trackImg, trackGenre);

    updateUser(user, userTracks, newTrack)

    if (!trackPrivacy) {
        postNewData(newTrack, "tracks");
    }
}
//--------------------------------------------------------------------------------------------------------------------------------------------
export const getUserByEmail = async (userEmail: string): Promise<UserType> => {
    const userFetched = await fetchData(`users?email=${userEmail}`) as UserType[];
    const user = userFetched[0];
    return user;
}
//--------------------------------------------------------------------------------------------------------------------------------------------
export const getNewTrack = (userId: string, trackUrl: string, trackId: string, trackTitle: string, trackImg: string, trackGenre: GenreTypes): TrackType => {
    const userArtist: ArtistType = {
        id: userId
    }

    const newTrack: TrackType = {
        id: trackId,
        name: trackTitle,
        imageUrl: trackImg,
        url: trackUrl,
        liked: 0,
        verified: false,
        genre: [trackGenre],
        artists: [userArtist]
    }
    return newTrack;
}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const updateUser = async (user: UserType, userTracks: TrackType[], newTrack: TrackType) => {
    await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            ...user,
            tracks: [...userTracks, newTrack]
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    // const dataFetched = await response.json();

}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const postNewData = async (newData: TrackType | UserType, newDataType: string) => {
    await fetch(`http://localhost:3001/${newDataType}`, {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    // const dataFetched = await response.json();

}



