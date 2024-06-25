import { Container, ListGroup, Row , Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import CartItem from "../../components/CartItem/CartItem";
import BuyForm from "../../components/BuyForm/BuyForm";
import { OrderArticles } from "../../services/articleService";


function CartPage() {
    const articlesInCart = useSelector(selectArticlesInCart)
    const dispatch = useDispatch()

    function onCartItemRemoveClick(itemId){
        dispatch(removeArticleFromCart(itemId))
    }
    function OnOrderPlaced(orderData){
        OrderArticles(articlesInCart, orderData)
        console.log(articlesInCart)
        console.log(orderData);
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

    return (
        <Container className="p-5 p-sm-1 " >

            <Row className='justify-content-center  gap-5 gap-lg-2' >
                <Col xs={{span: 12, order: 2}} lg={{span: 5, order: 1}}>
                    <BuyForm onSubmit={OnOrderPlaced}></BuyForm>
                </Col>
                <Col xs={{span: 12, order: 1}} lg={{span: 5, order: 2}}>
                    <ListGroup className="gap-2  ">
                        {RenderArticles()}
                    </ListGroup>
                </Col>
                {/*TODO try get data from local storage */}

            </Row>
        </Container>
    );
}

export default CartPage;