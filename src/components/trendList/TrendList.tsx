import { useEffect, useState } from "react"
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"
import { TopTrends } from "../../types/dataTypes/topTrends"
import { fetchData } from "../../api/fetchApi"
import { useTranslation } from "react-i18next"
import { useAuth0 } from "@auth0/auth0-react"

export const TrendList = () => {
    const [topTrends, setTopTrends] = useState<TopTrends | null>(null)
    const { t } = useTranslation();
    const { getAccessTokenSilently } = useAuth0();

    useEffect(() => {
        (async function fetchTopTrends() {
            const topTrendsFetched: TopTrends = await fetchData(getAccessTokenSilently, "topTrends") as TopTrends;
            setTopTrends(topTrendsFetched);
        }());
    }, [])

    const topTrendsArray = [
        { id: "top-playlists", topTrendText: "Top Playlists", topTrendArray: topTrends?.topPlaylists },
        { id: "top-artists", topTrendText: t('topArtists'), topTrendArray: topTrends?.topArtists },
        { id: "top-albums", topTrendText: t('topAlbums'), topTrendArray: topTrends?.topAlbums }
    ]
    return (
        <div className="trendlist-wrapper">
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
                <div className="white-space"></div>
            </div>
        </div>
    )
}
