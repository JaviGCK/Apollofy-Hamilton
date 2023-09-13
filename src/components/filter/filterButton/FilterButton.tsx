

import { useFilterContext } from '../../../utils/hooks/useFilterProvider'
import "./filterButton.css"


export const FilterButton = ({ ...props }) => {

    const { changeFilter } = useFilterContext()

    return (

        <>
            <input id={props.id} name="filter" type="radio" className="filter-input" value={props.id}
                onChange={() => changeFilter(props.filter)}
                defaultChecked={props.filter === "all"}
            />
            <label htmlFor={props.id} className="filter-label">
                {props.name}
            </label>
        </>

    )
}
