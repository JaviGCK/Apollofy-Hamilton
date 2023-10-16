import { FilterButton } from '.'
import { FilterCategories } from '../../pages/libraryPage/LibraryPage'
import "./filter.css"

export const Filter = ({ ...props }) => {

    return (
        <nav className="library-filter" >
            {props.filters.map((category: FilterCategories) => (
                <FilterButton
                    name={category.name}
                    id={category.id}
                    key={category.id}
                    filter={category.filter}
                />
            ))}
        </nav>
    )
}
