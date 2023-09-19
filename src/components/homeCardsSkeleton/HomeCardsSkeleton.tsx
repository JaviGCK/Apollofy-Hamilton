import Skeleton from 'react-loading-skeleton'
import './homeCardSkeleton.css'

export const HomeCardsSkeleton = () => {
    return (
        <div className="skeleton-container">
            {Array(3).fill(0).map((i, index) => (
                <div key={i + index} className="card-skeleton-container">
                    <Skeleton className="skeleton-top-type" />
                    <div className="items-skeleton">
                        {Array(2).fill(0).map((i, index) => (
                            <div className="card-item-skeleton" key={i + index}>
                                <Skeleton className="skeleton-card-item" />
                            </div>
                        ))}
                    </div>

                </div>
            ))}
        </div>
    )
}
