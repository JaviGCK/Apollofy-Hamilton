
import { useFilterContext } from '../../../utils/hooks/useFilterProvider'
import "./filterButton.css"


export const FilterButton = ({ ...props }) => {

    const { currentFilter, changeFilter } = useFilterContext()

    return (
        <>
            <input id={props.id} name="filter" type="radio" className="filter-input" value={props.id}
                onChange={() => changeFilter(props.filter)}
                defaultChecked={props.filter === currentFilter}
            />
            <label htmlFor={props.id} className="filter-label">
                {props.name}
            </label>
        </>

    )
}
