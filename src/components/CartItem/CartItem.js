
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons'; // Assuming you're using Font Awesome icons
import './CartItem.css'


//TODO responsivnes not the best
function CartItem({onClickX = () => {}, item = {id: 0 ,title: '', imageSrc: "/chip.jpg", amount: 1,cost: 0, aditionalSelectors: []} , display = false}) {
    return ( 
        <div className="cart-item">
            <Image className='cart-image' src={item.imageSrc ?? "/chip.jpg"}></Image>
            <div className='cart-data-con'>
                <p className='cart-title'>{item.name}</p>
                <div>
                    <p className='item-amount'>{`Kolicina: ${item.amount}`}</p>
                    <p className='item-cost'>{`Cena: ${item.cost * item.amount},00 RSD`}</p>
                </div>
            </div>
            {
            display === false ? 
            (<FontAwesomeIcon onClick={() => onClickX(item.id)} className='item-cross-icon' size='sm' icon={faX}></FontAwesomeIcon>) : ""
            }  
        </div>
     );
}

export default CartItem;