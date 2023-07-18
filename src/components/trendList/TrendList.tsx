import { useEffect, useState } from "react"
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"
import { TopTrends } from "../../types/dataTypes/topTrends"
import { fetchData } from "../../api/fetchApi"

export const TrendList = () => {
    const [topTrends, setTopTrends] = useState<TopTrends | null>(null)

    useEffect(() => {
        (async function fetchTopTrends() {
            const topTrendsFetched: TopTrends = await fetchData("topTrends") as TopTrends;
            setTopTrends(topTrendsFetched);
        }());
    }, [])

    const topTrendsArray = [
        { id: "top-playlists", topTrendText: "Top Playlists", topTrendArray: topTrends?.topPlaylists },
        { id: "top-artists", topTrendText: "Top Artists", topTrendArray: topTrends?.topArtists },
        { id: "top-albums", topTrendText: "Top Albums", topTrendArray: topTrends?.topAlbums }
    ]
    return (
        <div className="trendlist-container">

            {topTrends && topTrendsArray.map((topTrendType) => (
                <div key={topTrendType.id} className="top-trend-container">
                    <h3 className="trend-type-title">{topTrendType.topTrendText}</h3>
                    <div className="top-trend-items-container">
                        {topTrendType.topTrendArray?.map((topTrendItem) => (
                            <TrendItem
                                key={topTrendItem.id}
                                id={topTrendItem.id}
                                type={topTrendItem.type}
                            />
                        ))}
                    </div>
                </div>
            ))}
            <div className="white-space-home-page"></div>
        </div>
    )
}
