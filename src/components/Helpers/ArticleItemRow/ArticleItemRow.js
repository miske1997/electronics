import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Image } from "react-bootstrap";
import './ArticleItemRow.css'
import { faX } from "@fortawesome/free-solid-svg-icons";

function ArticleItemRow({onCartItemRemoveClick = () => {},  article = {name: '', imageSrc: '', amount: 1, cost: 0}}) {
    return (
        <tr className="article-row">
            <td>
                <Image className='cart-image' src={article.imageSrc ?? "/chip.jpg"}></Image>
            </td>
            <td>
                {article.name}
            </td>
            <td>
                {article.amount}
            </td>
            <td>
                {`${article.cost},00 RSD`}
            </td>
            <FontAwesomeIcon onClick={() => onCartItemRemoveClick(article.id)} className='item-cross-icon' size='sm' icon={faX}></FontAwesomeIcon>
        </tr>
    );
}

export default ArticleItemRow;