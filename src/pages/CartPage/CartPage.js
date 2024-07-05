import { Container, ListGroup, Row , Col} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import CartItem from "../../components/CartItem/CartItem";
import BuyForm from "../../components/BuyForm/BuyForm";
import { OrderArticles } from "../../services/articleService";
import "./CartPage.css"

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
    function CalculatePriceSum() {
        let price = 0
        articlesInCart.forEach(article => {
            price += article.cost * article.amount
        });
        return price
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
                    <div className="cost-sum-con">
                        <p>Cena:</p>
                        <p className="cost-sum">{`${CalculatePriceSum()} RSD`}</p>
                    </div>
                </Col>
                {/*TODO try get data from local storage */}

            </Row>
        </Container>
    );
}

export default CartPage;