import { GenresList } from "../../components/lists/genresList/GenresList";
import { SearchBar } from "../../components/searchBar/SearchBar";
import { useEffect, useState } from "react";
import SearchList from "../../components/lists/searchList/SearchList";
import "./searchPage.css";
import { fetchData } from "../../api/fetchApi";
import { useAuth0 } from "@auth0/auth0-react";
import { AlbumType } from "../../types/album";
import { ArtistType } from "../../types/artist";
import { PlaylistType } from "../../types/playlist";
import { TrackType } from "../../types/track";
import { UserType } from "../../components/profileChart/ProfileChart";
import { SearchBarSkeleton } from "../../components/searchBarSkeleton/SearchBarSkeleton";


export type DataRetrievedType = {
    albums: AlbumType[],
    artists: ArtistType[],
    playlists: PlaylistType[],
    tracks: TrackType[],
    users: UserType[]
}

export const SearchPage = () => {
    const [focus, setFocus] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const { getAccessTokenSilently } = useAuth0();
    const [dataRetrieved, setDataRetrieved] = useState<DataRetrievedType | null>(null)

    const retrieveData = async () => {
        const fetchedAlbumData: AlbumType[] = await fetchData(getAccessTokenSilently, 'albums') as AlbumType[];

        const fetchedArtistData: ArtistType[] = await fetchData(getAccessTokenSilently, 'artists') as ArtistType[];

        const fetchedTracktData: TrackType[] = await fetchData(getAccessTokenSilently, 'tracks') as TrackType[];

        const fetchedPlaylistData: PlaylistType[] = await fetchData(getAccessTokenSilently, 'playlists') as PlaylistType[];

        const fetchedUsersData: UserType[] = await fetchData(getAccessTokenSilently, 'users') as UserType[];

        const allFetchedData: DataRetrievedType = {
            albums: fetchedAlbumData,
            artists: fetchedArtistData,
            tracks: fetchedTracktData,
            playlists: fetchedPlaylistData,
            users: fetchedUsersData
        }

        setDataRetrieved(allFetchedData);
    }

    useEffect(() => {
        retrieveData()
    }, [])


    return (
        <section className="search-page-container">
            {dataRetrieved ? <SearchBar focus={focus} setFocus={setFocus} searchInput={searchInput} setSearchInput={setSearchInput} /> : <SearchBarSkeleton />}
            {focus && dataRetrieved ? <SearchList dataRetrieved={dataRetrieved} focus={focus} setFocus={setFocus} searchInput={searchInput} setSearchInput={setSearchInput} /> : <GenresList />}
        </section>
    )
}
