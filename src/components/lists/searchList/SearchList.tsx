import './searchList.css'
import { fetchData } from '../../../api/fetchApi'
import { useState, useEffect, useReducer, useRef } from 'react'
import { GiUfo } from "react-icons/gi"
import { SearchProps } from '../../../types/propTypes/searchProps'
import { AlbumType } from '../../../types/dataTypes/album'
import { GroupItem } from '../groupItem/GroupItem'
import { TrackType } from '../../../types/dataTypes/track'
import { PlaylistType } from '../../../types/dataTypes/playlist'
import { ArtistType } from '../../../types/dataTypes/artist'

const reducer = (filter:any, action:any) => {
    switch (action.type) {
    case 'SET_ALL':
        return 'All';
    case 'SET_TRACKS':
        return 'Tracks';
    case 'SET_ARTIST':
        return 'Artist';
    case 'SET_ALBUM':
        return 'Album';
    case 'SET_PLAYLIST':
        return 'Playlist';
    default:
        return filter;
    }
};

const SearchList = (props: SearchProps) => {
    const { searchInput} = props
    //Search Filters Usestate
    const [dataAlbum, setDataAlbum] = useState<AlbumType[]>([])
    const [dataArtists, setDataArtist] = useState<ArtistType[]>([])
    const [dataTracks, setDataTracks] = useState<TrackType[]>([])
    const [dataPlaylists, setDataPlaylists] = useState<PlaylistType[]>([])
    const [filteredAlbum, setFilteredAlbum] = useState<AlbumType[]>([])
    const [filteredArtist, setFilteredArtists] = useState<ArtistType[]>([])
    const [filteredTrack, setFilteredTracks] = useState<TrackType[]>([])
    const [filteredPlaylist, setFilteredPlaylist] = useState<PlaylistType[]>([])
    //Button Filter Usestate
    //!const [allFilter, setAllFilter] = useState(false);
    //!const [tracksFilter, setTracksFilter] = useState(false);
    //!const [artistFilter, setArtistFilter] = useState(false);
    //!const [albumFilter, setAlbumFilter] = useState(false);
    //!const [trackFilter, setTrackFilter] = useState(false);
    const initialState = 'All';
    const [filter, dispatch] = useReducer(reducer, initialState);

    const scrollRef = useRef<HTMLElement | null>(null)

    const retrieveData = async() => {
        const fetchedAlbumData: any = await fetchData('albums')
        setDataAlbum(fetchedAlbumData);
        const fetchedArtistData: any = await fetchData('artists')
        setDataArtist(fetchedArtistData);
        const fetchedTracktData: any = await fetchData('tracks')
        setDataTracks(fetchedTracktData);
        const fetchedPlaylistData: any = await fetchData('playlists')
        setDataPlaylists(fetchedPlaylistData);
    }
    useEffect(() => {
        retrieveData()
    }, [])

    useEffect(() => {
        //Filter albums
        const filteredAlbums = dataAlbum.filter((album, index, arr) => {
            return arr.findIndex((a) => a.name === album.name) === index;
        });
        let result = filteredAlbums.filter((album) => album.name?.toLowerCase().includes(searchInput.toLowerCase()))
        if (result){
            setFilteredAlbum(result)
        }
        //Filter Artist
        const filteredArtists = dataArtists.filter((artist, index, arr) =>{
            return arr.findIndex((a) => a.name === artist.name) === index;
        });
        result = filteredArtists.filter((artist) => artist.name?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
        if (result){
            setFilteredArtists(result);
        }
        //Filter Tracks
        const filteredTracks = dataTracks.filter((track, index, arr) => {
            return arr.findIndex((a) => a.name === track.name) === index;
        });
        let result3 = filteredTracks.filter((track) => track.name?.toLowerCase().includes(searchInput.toLocaleLowerCase()));
        if (result3) {
            setFilteredTracks(result3)
        }
        //Filter Playlists
        const filteredPlayLists = dataPlaylists.filter((playlist, index, arr) => {
            return arr.findIndex((a) => a.name === playlist.name) === index;
        });
        let result4 = filteredPlayLists.filter((playlist) => playlist.name?.toLowerCase().includes(searchInput.toLocaleLowerCase()))
        if (result4) {
            setFilteredPlaylist(result4)
        }

    }, [searchInput])
    const adjustScrollBar = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }
    useEffect(() => {
        adjustScrollBar()
    }
    ,[filter]);
    return (
        <>
        <section className='searchlist-container' ref={scrollRef}>

            <div className='results-container'>
                {searchInput == '' ? <div className='sl-awaiting-input'>
                    <p>Listen to anything... anywhere you want.</p>
                    <GiUfo className="ufo-ico"/>
                </div>

                :

                <div className='sl-input-received'>
                    <div className='sl-filter-buttons'>
                    <button className={`slf-btn ${filter === 'All' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ALL' })}>All</button>
                        <button className={`slf-btn ${filter === 'Tracks' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_TRACKS' })}>Tracks</button>
                        <button className={`slf-btn ${filter === 'Artist' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ARTIST' })}>Artist</button>
                        <button className={`slf-btn ${filter === 'Album' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ALBUM' })}>Album</button>
                        <button className={`slf-btn ${filter === 'Playlist' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_PLAYLIST' })}>Playlist</button>
                    </div>



                {filter === 'All' || filter === 'Tracks' ? (
                <>
                {filteredTrack.length == 0 ?  <></> : <h3>Tracks</h3> }
                <div className='sl-result'>
                    {filteredTrack.map((track) => {
                        return (
                            <GroupItem
                            imageUrl={track.imageUrl}
                            name={track.name}
                            artist={track.artists![0].name}
                            type={"Track"}/>
                        )
                    }
                    )}
                </div>
                </>
                ) : null}


                {filter === 'All' || filter === 'Album' ? (
                <>
                {filteredAlbum.length === 0 ? null : <h3>Albums</h3>}
                <div className='sl-result'>
                {filteredAlbum.map((album) => (
                    <GroupItem
                    imageUrl={album.imageUrl}
                    name={album.name}
                    artist={album.artists![0].name}
                    type={'Album'}
                />
                ))}
                </div>
                </>
                ) : null}

                {filter === 'All' || filter === 'Artist' ? (
                <>
                {filteredArtist.length == 0 ?  <></> : <h3>Artist</h3> }
                <div className='sl-result'>
                {filteredArtist.map((artist) => {
                        return (
                            <GroupItem
                            imageUrl={artist.imageUrl}
                            name={artist.name}
                            type={"Artist"}/>
                        )
                    }
                    )}
                </div>
                </>
                ) : null}

                {filter === 'All' || filter === 'Playlist' ? (
                <>
                {filteredPlaylist.length == 0 ?  <></> : <h3>Playlists</h3> }
                <div className='sl-result'>
                    {filteredPlaylist.map((playlist) => {
                        return (
                            <GroupItem
                            imageUrl={playlist.imageUrl}
                            name={playlist.name}
                            artist={playlist.description}
                            type={"Playlist"}/>
                        )
                    }
                    )}
                </div>
                </>
                ) : null}

                </div>}

                <div className='white-space'></div>
            </div>

        </section>

        </>
    )
}

export default SearchList
