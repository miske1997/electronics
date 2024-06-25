import "./AmountSelect.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { Button } from "react-bootstrap";
import { useState } from "react";

function AmountSelect({amount = 1, changeAmountBy = () => {}}) {



    
    return (  
        <div className="amount-select">
            <Button onClick={() => changeAmountBy(-1)} className="icon">
                <FontAwesomeIcon  icon={faMinus} />
            </Button>
            <input className="input" type="number" defaultValue={amount}></input>
            <Button onClick={() => changeAmountBy(1)} className="icon">
                <FontAwesomeIcon  icon={faPlus} />
            </Button>
        </div>

    );
}
export default AmountSelect;