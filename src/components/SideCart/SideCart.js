import { Button, Image, ListGroup, Offcanvas, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import CartItem from "../CartItem/CartItem";
import "./SideCart.css"
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import ArticleItemRow from "../Helpers/ArticleItemRow/ArticleItemRow";

function SideCart({ show = false, handleClose = () => { } }) {

    const articlesInCart = useSelector(selectArticlesInCart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function onCartItemRemoveClick(itemId) {
        dispatch(removeArticleFromCart(itemId))
    }

    function RenderArticles() {
        return articlesInCart.map(article => {

            return (
                <ListGroup.Item>
                    <CartItem onClickX={onCartItemRemoveClick} item={article}></CartItem>
                </ListGroup.Item>
            )

        })
    }
    function RenderRow(){
        return articlesInCart.map(article => {
            return (
                <ArticleItemRow article={article} onCartItemRemoveClick={onCartItemRemoveClick}></ArticleItemRow>
            )

        })
    }
    function GoTo(url) {
        navigate(url);
    }
    return (

        <Offcanvas className="side-cart" placement={"end"} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="fs-2">Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Table >
                    <thead>
                        <tr>
                            <th></th>
                            <th>Ime</th>
                            <th>Kolicina</th>
                            <th>Ukupna Cena</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {RenderRow()}
                        
                    </tbody>
                </Table>
                <ListGroup className="gap-3 ">
                    
                </ListGroup>
                <Button onClick={() => { GoTo("/cart"); handleClose() }} size="lg" className="mt-3">Order</Button>
            </Offcanvas.Body>
        </Offcanvas>

    );
}

export default SideCart;