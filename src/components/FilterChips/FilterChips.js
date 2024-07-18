import { faX } from "@fortawesome/free-solid-svg-icons";
import "./FilterChips.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function FilterChips() {

    let filters = [{name: 'Marka', value: "UNI-T"}]

    function RemoveChip(filter){

    }

    function GetFilters(){
        return filters
    }

    function RenderChips(){
        return GetFilters().map(filter => {
            return (
                <div className="filter-chip">
                    {`${filter.name}: ${filter.value}`}
                    <FontAwesomeIcon onClick={() => RemoveChip(filter)} className='chip-cross-icon' size='sm' icon={faX}></FontAwesomeIcon>
                </div>
            )
        })
    }

    return ( 
        <div className="filter-chips-container">
            {RenderChips()}
        </div>
     );
}

export default FilterChips;