import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Image from 'react-bootstrap/Image';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrashCan } from '@fortawesome/free-solid-svg-icons';

import './ArticlePage.css'
import { useDispatch, useSelector } from "react-redux";
import { selectArticle } from "../../store/slices/articleSlice";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../../store/effects/articleEffects";
import { useParams } from "react-router";
import { addArticleToCart, removeArticleFromCart, selectArticlesInCart } from "../../store/slices/cartSlice";
import AmountSelect from "../../components/AmountSelect/AmountSelect";
import { Table } from "react-bootstrap";


function ArticlePage() {
    const [amount, setAmmount] = useState(1)
    const article = useSelector(selectArticle)
    const cart = useSelector(selectArticlesInCart)
    const dispatch = useDispatch()

    let { id } = useParams();
    let { categoryId } = useParams();


    useEffect(() => {
        dispatch(fetchArticleById(categoryId, id))
    }, [id, dispatch]);

    function ChangeAmount(change){
        setAmmount(amount => {
            amount += change
            return Math.max(1, amount)
        })
    }

    function addToCart(){
        dispatch(addArticleToCart({...article , imageSrc: "/chip.jpg", amount: amount, cost: 150}))
    }
    function removeFromCart(){
        dispatch(removeArticleFromCart(article.id ?? 0))
    }

    function renderSpecifications(){
        let specs = article.specification.split("\n")
        specs = specs.map(spec => spec.split(":"))
        console.log(specs);
        return specs.map(spec => {
            return (
                <tr>
                    <td>{spec[0]}</td>
                    <td>{spec[1]}</td>
                </tr>
            )
        })
    }

    function renderAddToCartButton(){
        if (!cart || !article)
            return;
        if (cart.filter(articleInCart => articleInCart.id === article.id).length > 0)
            return (<Button onClick={removeFromCart} className="m-1">Added to cart <FontAwesomeIcon icon={faTrashCan} /></Button>)
        else
            return (<Button onClick={addToCart} className="m-1">Add to cart <FontAwesomeIcon icon={faShoppingCart} /></Button>)
    }

    return (
        <main>
            <Container>
                <Row className="article-top justify-content-center">
                    <Col className="article-image-con" xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 6 }}>
                        <Image src="/chip.jpg" rounded></Image>
                    </Col>
                    <Col className="article-description" xs={{ span: 10 }} md={{ span: 4 }}>
                        <h2>
                            {article.name}
                        </h2>
                        <p>{article.cost}</p>
                        <div className="m-3">
                            <span>Kolicina</span>
                            <AmountSelect amount={amount} changeAmountBy={ChangeAmount}></AmountSelect>
                        </div>
                        <Button className="m-1">Order</Button>
                        {renderAddToCartButton()}
                    </Col>
                </Row>

                <Row className=" article-tabs justify-content-center">
                    <Col xs={{ span: 10 }} md={{span: 10}}>
                        <Tabs
                            defaultActiveKey="specification"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="specification" title="specification">
                                <Table hover bordered striped>
                                    <tbody>
                                        {renderSpecifications()}
                                    </tbody>
                                </Table>
                            </Tab>
                            <Tab eventKey="description" title="Description">
                                {article.description}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>

            </Container>

        </main>
    );
}

export default ArticlePage;