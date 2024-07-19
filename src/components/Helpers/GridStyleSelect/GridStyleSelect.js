import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faGripVertical } from '@fortawesome/free-solid-svg-icons';
import "./GridStyleSelect.css"

function GridStyleSelect({displayType = "grid", setDisplayType = () => {}}) {
    return (
        <div className="grid-style-select">
            <p>Vrsta prikaza:</p>
            <FontAwesomeIcon onClick={() => setDisplayType("list")} className={`icon ${displayType === "list" ? "selected" : ""}`} icon={faGripLines}></FontAwesomeIcon>
            <FontAwesomeIcon onClick={() => setDisplayType("grid")} className={`icon ${displayType === "grid" ? "selected" : ""}`} icon={faGripVertical}></FontAwesomeIcon>
        </div>
    );
}

export default GridStyleSelect;