import { createContext, useState } from "react";
import { ArtistType } from "../types/artist";
import { PlaylistType } from "../types/playlist";
import { AlbumType } from "../types/album";

export type TopTrendsType = {
    topArtists: ArtistType[],
    topPlaylists: PlaylistType[],
    topAlbums: AlbumType[]
}

interface TopTrendsContextTypes {
    topTrends: TopTrendsType | null,
    changeTopTrends: (newTopTrend: TopTrendsType) => void
}

export const topTrendsContext = createContext<TopTrendsContextTypes>({ topTrends: null, changeTopTrends: () => { } })

export const TopTrendsContextProvider = ({ ...props }) => {
    const [topTrends, setTopTrends] = useState<TopTrendsType | null>(null);
    const changeTopTrends = (newTopTrend: TopTrendsType) => {
        setTopTrends(newTopTrend)
    }
    return (
        <topTrendsContext.Provider value={{ topTrends, changeTopTrends }}>
            {props.children}
        </topTrendsContext.Provider>
    )
}