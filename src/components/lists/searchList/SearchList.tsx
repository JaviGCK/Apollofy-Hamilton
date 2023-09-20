import './searchList.css';
import { useState, useEffect, useReducer, useRef } from 'react';
import { GiUfo } from "react-icons/gi";
import { AlbumType } from '../../../types/album';
import { GroupItem } from '../groupItem/GroupItem';
import { TrackType } from '../../../types/track';
import { PlaylistType } from '../../../types/playlist';
import { ArtistType } from '../../../types/artist';
import { useTranslation } from 'react-i18next';
import { GroupUsers } from '../groupUsers/GroupUsers';
import { UserType } from '../../profileChart/ProfileChart';
import { DataRetrievedType } from '../../../pages/searchPage/SearchPage';


const reducer = (filter: any, action: any) => {
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
        case 'SET_USERS':
            return 'Users';
        default:
            return filter;
    }
};

export interface SearchProps {
    dataRetrieved?: DataRetrievedType,
    focus: boolean,
    setFocus: React.Dispatch<React.SetStateAction<boolean>>,
    searchInput: string,
    customFilter?: boolean,
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
}

const SearchList = (props: SearchProps) => {
    const { searchInput, dataRetrieved } = props

    // const {albums, playlists, tracks, artists, users} = dataRetrieved;

    const [filteredAlbum, setFilteredAlbum] = useState<AlbumType[]>([])
    const [filteredArtist, setFilteredArtists] = useState<ArtistType[]>([])
    const [filteredTrack, setFilteredTracks] = useState<TrackType[]>([])
    const [filteredPlaylist, setFilteredPlaylist] = useState<PlaylistType[]>([])
    const [filteredUsers, setFilteredUsers] = useState<UserType[]>([])

    const { t } = useTranslation();

    const initialState = 'All';
    const [filter, dispatch] = useReducer(reducer, initialState);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const scrollRef = useRef<HTMLElement | null>(null)



    useEffect(() => {
        //Filter albums
        if (dataRetrieved) {
            const filteredAlbums = dataRetrieved.albums.filter((album, index, arr) => {
                return arr.findIndex((a) => a.name === album.name) === index;
            });
            let resultAlbums = filteredAlbums.filter((album) => album.name?.toLowerCase().includes(searchInput.toLowerCase()) && !album.privacity)
            if (resultAlbums) {
                setFilteredAlbum(resultAlbums)
            }
            //Filter Artist
            const filteredArtists = dataRetrieved.artists.filter((artist, index, arr) => {
                return arr.findIndex((a) => a.name === artist.name) === index;
            });
            let resultArtists = filteredArtists.filter((artist) => artist.name?.toLocaleLowerCase().includes(searchInput.toLocaleLowerCase()))
            if (resultAlbums) {
                setFilteredArtists(resultArtists);
            }
            //Filter Tracks
            const filteredTracks = dataRetrieved.tracks.filter((track, index, arr) => {
                return arr.findIndex((a) => a.name === track.name) === index;
            });
            let resultTracks = filteredTracks.filter((track) => track.name?.toLowerCase().includes(searchInput.toLocaleLowerCase()) && !track.privacity);
            if (resultTracks) {
                setFilteredTracks(resultTracks)
            }
            //Filter Playlists
            const filteredPlayLists = dataRetrieved.playlists.filter((playlist, index, arr) => {
                return arr.findIndex((a) => a.name === playlist.name) === index;
            });
            let resultPlaylists = filteredPlayLists.filter((playlist) => playlist.name?.toLowerCase().includes(searchInput.toLocaleLowerCase()) && !playlist.privacity)
            if (resultPlaylists) {
                setFilteredPlaylist(resultPlaylists)
            }
            //Filter Users
            const filteredUser = dataRetrieved.users.filter((user, index, arr) => {
                return arr.findIndex((a) => a.userName === user.userName) === index;
            });
            let resultUsers = filteredUser.filter((user) => user.userName?.toLowerCase().includes(searchInput.toLocaleLowerCase()))
            if (resultUsers) {
                setFilteredUsers(resultUsers)
            }
        }

    }, [searchInput])

    const adjustScrollBar = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }
    useEffect(() => {
        adjustScrollBar()
    }, [filter]);

    const handleItemClick = (index: number) => {
        setActiveIndex(index);
    };
    return (
        <>
            <section className='searchlist-container' ref={scrollRef}>

                <div className='results-container'>
                    {searchInput == '' ? <div className='sl-awaiting-input'>
                        <p>{t('searchbarMessage')}</p>
                        <GiUfo className="ufo-ico" />
                    </div>

                        :

                        <div className='sl-input-received'>
                            <div className='sl-filter-buttons'>
                                <button className={`slf-btn ${filter === 'All' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ALL' })}>{t('allSearch')}</button>
                                <button className={`slf-btn ${filter === 'Users' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_USERS' })}>{t('userSearch')}</button>
                                <button className={`slf-btn ${filter === 'Tracks' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_TRACKS' })}>{t('tracksSearch')}</button>
                                <button className={`slf-btn ${filter === 'Artist' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ARTIST' })}>{t('artistsSearch')}</button>
                                <button className={`slf-btn ${filter === 'Album' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_ALBUM' })}>{t('albumsSearch')}</button>
                                <button className={`slf-btn ${filter === 'Playlist' ? 'slf-btn-selected' : ''}`} onClick={() => dispatch({ type: 'SET_PLAYLIST' })}>{t('playlistsSearch')}</button>

                            </div>



                            {filter === 'All' || filter === 'Tracks' ? (
                                <>
                                    {filteredTrack.length == 0 ? <></> : <h3>{t('tracksSearch')}</h3>}
                                    <div className='sl-result'>
                                        {filteredTrack.map((track, index) => {
                                            return (
                                                <GroupItem
                                                    key={track.audioUrl}
                                                    track={track}
                                                    isActive={activeIndex === index}
                                                    onItemClicked={() => handleItemClick(index)}

                                                />

                                            )
                                        }
                                        )}
                                    </div>
                                </>
                            ) : null}


                            {filter === 'All' || filter === 'Album' ? (
                                <>
                                    {filteredAlbum.length === 0 ? null : <h3>{t('albumsSearch')}</h3>}
                                    <div className='sl-result'>
                                        {filteredAlbum.map((album) => (
                                            <GroupItem
                                                key={album.id}
                                                track={album}
                                            />
                                        ))}
                                    </div>
                                </>
                            ) : null}

                            {filter === 'All' || filter === 'Artist' ? (
                                <>
                                    {filteredArtist.length == 0 ? <></> : <h3>{t('artistsSearch')}</h3>}
                                    <div className='sl-result'>
                                        {filteredArtist.map((artist) => {
                                            return (
                                                <GroupItem
                                                    key={artist.imageUrl}
                                                    track={artist} />
                                            )
                                        }
                                        )}
                                    </div>
                                </>
                            ) : null}

                            {filter === 'All' || filter === 'Playlist' ? (
                                <>
                                    {filteredPlaylist.length == 0 ? <></> : <h3>{t('playlistsSearch')}</h3>}
                                    <div className='sl-result'>
                                        {filteredPlaylist.map((playlist) => {
                                            return (
                                                <GroupItem
                                                    key={playlist.id}
                                                    track={playlist} />
                                            )
                                        }
                                        )}
                                    </div>
                                </>
                            ) : null}

                            {filter === 'Users' ? (
                                <>
                                    {filteredUsers.length === 0 ? null : <h3>{t('userSearch')}</h3>}
                                    <div className='sl-result'>
                                        {filteredUsers.map((user) => (
                                            <GroupUsers
                                                key={user.id}
                                                user={user}
                                            />
                                        ))}
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
