import { useEffect, useState } from "react"
import { PossibleItems } from "../../types/dataTypes/enums"
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"
import { TopTrends } from "../../types/dataTypes/topTrends"
import { fetchData } from "../../api/fetchApi"

export const TrendList = () => {
    const [topTrends, setTopTrends] = useState<TopTrends>({
        "topAlbums": [],
        "topArtists": [],
        "topPlaylists": []
    })
    const { topAlbums, topArtists, topPlaylists } = topTrends;

    const topTrendsArray = [
        { id: "top-playlists", topTrendText: "Top Playlists", topTrendArray: topPlaylists },
        { id: "top-artists", topTrendText: "Top Artists", topTrendArray: topArtists },
        { id: "top-albums", topTrendText: "Top Albums", topTrendArray: topAlbums }
    ]

    useEffect(() => {
        (async function fetchTopTrends() {
            const topTrendsFetched: TopTrends = await fetchData("topTrends") as TopTrends;
            setTopTrends(topTrendsFetched);
        }());
    }, [])

    return (
        <div className="trendlist-container">
            {topTrendsArray.map((topTrendType) => (
                <div key={topTrendType.id}>
                    <h3>{topTrendType.topTrendText}</h3>
                    {topTrendType.topTrendArray.map((topTrendItem) => (
                        
                    ))}
                </div>
            ))}
        </div>
    )
}
