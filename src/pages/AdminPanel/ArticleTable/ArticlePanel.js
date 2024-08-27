import "./ArticlePanel.css"
import { Button, Col, Container, Form, FormControl, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CreateArticle, DeleteArticle, GetAllArticlesForCategory, UpdateArticle } from "../../../services/articleService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faSearch, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CreateArticleModal from "./Create/CreateArticle";
import { GetFiltersForCategory } from "../../../services/categoryService";
import ConfirmationPopup from "../ConfirmationPopup/ConfirmationPopup";

function ArticleTable() {

    const [articleData, setArticleData] = useState([])
    const [categoryFilters, setFilters] = useState([])
    const [selectedArticle, setSelectedArticle] = useState(null)
    let { categoryId } = useParams();
    const [show, setShow] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleShowConfirmation = (id) => {
        setShowConfirmation(true)
        setSelectedArticle({id})
    }
    const handleHideConfirmation = () => {
        setSelectedArticle(null)
        setShowConfirmation(false)
    }

    const handleClose = () => {
        setSelectedArticle(null)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        GetAllArticlesForCategory(categoryId).then(data => {
            console.log("got data");
            setArticleData(data)
        })
        GetFiltersForCategory(categoryId).then(data => {
            setFilters(data)
        })
    }, []);

    function renderData() {
        if (!articleData || articleData.length === 0) {
            return
        }
        return articleData.map((data, index) => (
            <tr>
                <td>{index}</td>
                <td>{data.name}</td>
                <td>{data.cost}</td>
                <td>{data.type}</td>
                <td>{data.buys}</td>
                <td>
                    <Button onClick={() => handleShowConfirmation(data.id)}>
                        <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                    </Button>
                    <Button onClick={() => onEditArticle(data)}>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Button>
                </td>
            </tr>
        ))
    }

    function onCreateArticle(article) {
        CreateArticle(categoryId, article).then(data => {
            setArticleData(articles => {
                articles.push({ ...article, id: data.id })
                return articles
            })
            handleClose()
            alert("Ubaceno")
        }).catch(err => {
            console.log(err)
            alert("Nije se lepo ubacilo")
        })
    }

    function onEditArticle(article) {
        setSelectedArticle(selected => article)
        setShow(true)
    }

    function onSaveEdit(article, id) {
        UpdateArticle(article, categoryId, id).then(data => {
            handleClose()
            alert("Ubaceno")
            
            console.log(data);
        }).catch(err => {
            console.log(err)
            alert("Nije se lepo ubacilo")
        })
    }

    function onDeleteArticle(articleId) {
        DeleteArticle(categoryId, articleId).then(data => {
            setArticleData(articles => articles.filter(article => article.id !== articleId))
            handleHideConfirmation()
        })
        .catch(err => {
            console.log(err);

        })
    }
    return (
        <>
            <CreateArticleModal article={selectedArticle} onSaveEdit={onSaveEdit} onCreate={onCreateArticle} filters={categoryFilters} show={show} onClose={handleClose} />
            <ConfirmationPopup show={showConfirmation} header="Delete Article" text="Are you sure you want to delete that article" onConfirm={() => onDeleteArticle(selectedArticle.id)} onCancle={handleHideConfirmation}></ConfirmationPopup>
            <Container>
                <Row className="header" lg={20}>
                    <Col md={4} className="search-form">
                        <Form.Control />
                        <FontAwesomeIcon onClick={() => console.log("search")} className="search-button" icon={faSearch}></FontAwesomeIcon>
                    </Col>
                    <Col md={{ span: 2, offset: 6 }}>
                        <Button onClick={handleShow}>
                            New <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>
                </Row>
                {/* <Row className="header">
                    <Col lg={{ span: 2, offset: 10 }}>
                        <Button onClick={handleShow}>
                            New <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                    </Col>
                    <Col lg={{ span: 5, offset: 1 }}>
                        <FormControl></FormControl>
                    </Col>
                </Row> */}
                <Row lg={20}>
                    <Col lg={{ span: 18, offset: 0 }}>
                        <Table className="table" hover bordered responsive striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Cost</th>
                                    <th>Type</th>
                                    <th>Buys</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderData()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default ArticleTable;