
import { FilterCategories } from "../../types/propTypes/filterTypes"
import { FilterButton } from '.'
import "./filter.css"



export const Filter = ({ ...props }) => {



    return (
        <nav >
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
