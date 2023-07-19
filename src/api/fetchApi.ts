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

export const postDataCloud = async (dataForm: FormData) => {
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
    const userFetched = await fetchData(`users?email=${userEmail}`) as UserType[];
    const user = userFetched[0];

    const userTracks = user.tracks as TrackType[];
    const userArtist: ArtistType = {
        id: user.id
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
    updateUser(user, userTracks, newTrack)

    if (!trackPrivacy) {
        postTrack(newTrack);
    }
}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const updateUser = async (user: UserType, userTracks: TrackType[], newTrack: TrackType) => {
    const response = await fetch(`http://localhost:3001/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify({
            ...user,
            tracks: [...userTracks, newTrack]
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const dataFetched = await response.json();
    console.log(dataFetched);
}

//--------------------------------------------------------------------------------------------------------------------------------------------

export const postTrack = async (track: TrackType) => {
    const response = await fetch("http://localhost:3001/tracks", {
        method: "POST",
        body: JSON.stringify(track),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const dataFetched = await response.json();
    console.log(dataFetched);
}


