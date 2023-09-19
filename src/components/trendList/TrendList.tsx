
import { TrendItem } from "./trendItem/TrendItem"
import "./trendList.css"
import { useTranslation } from "react-i18next"
import { useTopTrendsContext } from "../../utils/hooks/useTopTrendsContext"


export const TrendList = () => {
    const { t } = useTranslation();
    const { topTrends } = useTopTrendsContext();


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
                                    item={topTrendItem}
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
