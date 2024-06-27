import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using Font Awesome icons
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './FilterSelect.css'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { removeFilter, setFilter } from '../../store/slices/categorySlice';

const FilterSelect = ({onValueChanged = () => {}, filterName = 'Filter', options = [], paramName = "" }) =>{
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const url = new URL(window.location);
  const filterCurrent = url.searchParams.get(paramName) ?? "None"

  useEffect(() => {
    if (filterCurrent !== "None"){
      dispatch(setFilter({name : paramName, value: filterCurrent}))
    }
  }, [filterCurrent]);


  function AddUrlParam(option){
    dispatch(setFilter({name : paramName, value: option}))
    url.searchParams.set(paramName, option);
    navigate(url.search)
  }
  function RemoveParam(){
    dispatch(removeFilter(paramName))
    url.searchParams.delete(paramName)
    navigate(url.search)
  }

  function RenderItems(){
    return options.map(option => {
      return (<Dropdown.Item onClick={(event) => {event.preventDefault(); AddUrlParam(option); onValueChanged(option)}}>{option}</Dropdown.Item>)
    })
  }

  return (
    <DropdownButton color='secondary' className='filter-select' id="dropdown-basic-button" title={
        <span>
          {`${filterName} : ${filterCurrent}`} <FontAwesomeIcon icon={faFilter} />
        </span>
      }>
      <Dropdown.Item onClick={(event) => {event.preventDefault(); RemoveParam()}}>None</Dropdown.Item>
      {RenderItems()}
    </DropdownButton>
)}

export default FilterSelect