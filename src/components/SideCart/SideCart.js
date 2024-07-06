import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import CartItem from "../CartItem/CartItem";
import "./SideCart.css"
import { useNavigate } from "react-router";

function SideCart({ show = false, handleClose = () => { } }) {

    const articlesInCart = useSelector(selectArticlesInCart)
    const dispatch = useDispatch()
    const navigate = useNavigate();

    function onCartItemRemoveClick(itemId){
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
    function GoTo(url){
        navigate(url);
    }
    return (

        <Offcanvas className="side-cart" placement={"end"} show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className="fs-2">Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <ListGroup className="gap-3 ">
                    {RenderArticles()}
                </ListGroup>
                <Button onClick={() => {GoTo("/cart"); handleClose()}} size="lg" className="mt-3">Order</Button>
            </Offcanvas.Body>
        </Offcanvas>

    );
}

export default SideCart;