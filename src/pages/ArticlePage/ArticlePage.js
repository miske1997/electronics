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
import { Breadcrumb, Stack, Table } from "react-bootstrap";
import Carousel from "../../components/Carousel/Carousel";
import PopularCard from "../../components/PopularCard/PopularCard";


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

    function ChangeAmount(change) {
        setAmmount(amount => {
            amount += change
            return Math.max(1, amount)
        })
    }

    function addToCart() {
        dispatch(addArticleToCart({ ...article, imageSrc: "/chip.jpg", amount: amount, cost: 150 }))
    }
    function removeFromCart() {
        dispatch(removeArticleFromCart(article.id ?? 0))
    }

    function renderSpecifications() {
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

    function renderAddToCartButton() {
        if (!cart || !article)
            return;
        if (cart.filter(articleInCart => articleInCart.id === article.id).length > 0)
            return (<Button onClick={removeFromCart} className="m-1">U korpi <FontAwesomeIcon icon={faTrashCan} /></Button>)
        else
            return (<Button onClick={addToCart} className="m-1">Dodaj u korpu <FontAwesomeIcon icon={faShoppingCart} /></Button>)
    }

    return (
        <main className="article-page-main">
            <Container>
                <Row>
                    <Col md={{ order: 3 }} lg={{ order: 3 }} xl={{ order: 3 }}>
                        <Breadcrumb className="bread-crumbs">
                            <Breadcrumb.Item>Pocetna</Breadcrumb.Item>
                            <Breadcrumb.Item>Merni Instrumenti</Breadcrumb.Item>
                            <Breadcrumb.Item>Digitalni multimeri</Breadcrumb.Item>
                            <Breadcrumb.Item>UNI-T UT622E LCR</Breadcrumb.Item>
                        </Breadcrumb>
                    </Col>
                </Row>
                <Row className="article-top justify-content-center">
                    <Col className="article-image-con" xs={{ span: 10 }} sm={{ span: 10 }} md={{ span: 6 }}>
                        <Image src="/chip.jpg" rounded></Image>
                    </Col>
                    <Col className="article-description" xs={{ span: 10 }} md={{ span: 4 }}>
                        <h2 className="fs-1">
                            {article.name}
                        </h2>
                        <p>TR2N109</p>
                        <div style={{ flexGrow: "1" }}></div>
                        {/* <div className="m-3">
                            <span>Kolicina</span>
                            <AmountSelect amount={amount} changeAmountBy={ChangeAmount}></AmountSelect>
                        </div> */}
                        <div className="m-1" style={{ paddingBottom: "1rem", display: "flex", gap: "1rem", alignItems: "center" }}>
                            <h3 className="m-0">{`${article.cost} RSD`}</h3>
                            <input style={{ margin: 0, width: "5rem", textAlign: 'center' }} defaultValue={1} min={1} type="number"></input>
                        </div>
                        <div>
                            <Button className="m-1">Naruci</Button>
                            {renderAddToCartButton()}
                        </div>
                    </Col>
                </Row>

                <Row className=" article-tabs justify-content-center">
                    <Col xs={{ span: 10 }} md={{ span: 10 }}>
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
                                <div className="text-start p2 fs-5">
                                    {article.description}
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
                <Row className="mt-5 justify-content-center">
                    <Col>
                        <h2>Preporuceni Artikli</h2>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                        <Col>
                            <Carousel>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                                <PopularCard article={{ name: 'Intel', description: "asdjkln jkdnbsa jkdbnjk", cost: "500" }}></PopularCard>
                            </Carousel>
                        </Col>
                </Row>
            </Container>

        </main>
    );
}

export default ArticlePage;