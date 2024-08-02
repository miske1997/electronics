import { Container, ListGroup, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import CartItem from "../../components/CartItem/CartItem";
import BuyForm from "../../components/BuyForm/BuyForm";
import { IncrementArticleSalesOfCart, OrderArticles } from "../../services/articleService";
import "./CartPage.css"
import { Timestamp } from "firebase/firestore";
import ArticleItemRow from "../../components/Helpers/ArticleItemRow/ArticleItemRow";
import { IncrementCategorySalesForCart } from "../../services/categoryService";

function CartPage() {
    const articlesInCart = useSelector(selectArticlesInCart)
    const dispatch = useDispatch()

    function onCartItemRemoveClick(itemId) {
        dispatch(removeArticleFromCart(itemId))
    }
    function OnOrderPlaced(orderData) {
        OrderArticles(articlesInCart, { ...orderData, orderTime: Timestamp.fromDate(new Date()) })
        IncrementCategorySalesForCart(articlesInCart)
        IncrementArticleSalesOfCart(articlesInCart)
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

    function RenderRow() {
        return articlesInCart.map(article => {
            return (
                <ArticleItemRow article={article} onCartItemRemoveClick={onCartItemRemoveClick}></ArticleItemRow>
            )

        })
    }

    return (
        <Container className="cart-page " >

            <Row className='justify-content-center  gap-5 gap-lg-2' >
                <Col xs={{ span: 12, order: 2 }} lg={{ span: 5, order: 1 }}>
                    <BuyForm onSubmit={OnOrderPlaced}></BuyForm>
                </Col>
                <Col xs={{ span: 12, order: 1 }} lg={{ span: 5, order: 2 }}>
                    <Table >
                        <thead>
                            <tr style={{verticalAlign: "middle"}}>
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
                    {/* <ListGroup className="gap-2  ">
                        {RenderArticles()}
                    </ListGroup> */}
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