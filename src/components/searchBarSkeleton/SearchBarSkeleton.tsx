
import "./searchBarSkeleton.css";
import { t } from "i18next";
import Skeleton from "react-loading-skeleton";


export const SearchBarSkeleton = () => {
    return (
        <div className="searchbar-skeleton-container">
            <h2 className="searchbar-skeleton-title">{t('search')}</h2>
            <Skeleton className="searchbar-skeleton" />
        </div>
    )
}
