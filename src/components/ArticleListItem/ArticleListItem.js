
import { Button } from "react-bootstrap";
import "./ArticleListItem.css"

function ArticleListItem({onClick = () => {}, articleInCart = false, article = {id: 0, name: '', cost: 0}, imageSrc = 'chip.jpg'}) {
    return ( 
        <div onClick={() => onClick(article)} className="article-list-item">
            <img src={`/${imageSrc}`} alt="chip.jpg"></img>
            <div className="details">
                <h5>{article.name}</h5>
                <p>{`${article.cost} RSD`}</p>
            </div>
            <input defaultValue={1} type="number" className="kolicina"></input>
            <Button className="naruci">Naruci</Button>
        </div>
     );
}

export default ArticleListItem;