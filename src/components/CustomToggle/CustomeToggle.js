import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using Font Awesome icons
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './CustomToggle.css'
import { useNavigate } from 'react-router';

const CustomToggle = ({onValueChanged = () => {} }) =>{
  const navigate = useNavigate();
  const url = new URL(window.location);
  const filterCurrent = url.searchParams.get("sort") ?? "None"
  

  function AddUrlParam(option){
    url.searchParams.set("sort", option);
    navigate(url.search)
  }
  return (
    <DropdownButton className="dropdown-basic-button" title={
        <span>
          {`${filterCurrent}`} <FontAwesomeIcon icon={faFilter} />
        </span>
      }>
      <Dropdown.Item  onClick={(event) => {event.preventDefault(); AddUrlParam("Name Asc"); onValueChanged(0)}}>By: Name Asc</Dropdown.Item>
      <Dropdown.Item  onClick={(event) => {event.preventDefault(); AddUrlParam("Name Desc"); onValueChanged(1)}}>By: Name Desc</Dropdown.Item>
      <Dropdown.Item onClick={(event) => {event.preventDefault(); AddUrlParam("Popularity"); onValueChanged(2)}}>By: Popularity</Dropdown.Item>
      <Dropdown.Item  onClick={(event) => {event.preventDefault(); AddUrlParam("Price Asc"); onValueChanged(3)}}>By: Price Asc</Dropdown.Item>
      <Dropdown.Item  onClick={(event) => {event.preventDefault(); AddUrlParam("Price Desc"); onValueChanged(4)}}>By: Price Desc</Dropdown.Item>
    </DropdownButton>
)}

export default CustomToggle