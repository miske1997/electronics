import { faX } from "@fortawesome/free-solid-svg-icons";
import "./FilterChips.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { removeFilter, selectCheckedFilters } from "../../store/slices/categorySlice";

function FilterChips() {
    const dispatch = useDispatch()
    let filters = [{name: 'Marka', value: "UNI-T"}]
    const checkedFilters = useSelector(selectCheckedFilters)

    function RemoveChip(paramName, option){
        dispatch(removeFilter({name: paramName, value: option}))
    }

    function RenderChips(){
        return checkedFilters.map(filter => {
            return filter.options.map(option => {
                return (
                    <div className="filter-chip">
                        {`${filter.name}: ${option}`}
                        <FontAwesomeIcon onClick={() => RemoveChip(filter.name, option)} className='chip-cross-icon' size='sm' icon={faX}></FontAwesomeIcon>
                    </div>
                )
            })
        })
    }

    return ( 
        <div className="filter-chips-container">
            {RenderChips()}
        </div>
     );
}

export default FilterChips;