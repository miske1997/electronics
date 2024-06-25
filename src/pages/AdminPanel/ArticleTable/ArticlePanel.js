import "./ArticlePanel.css"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { CreateArticle, DeleteArticle, GetAllArticlesForCategory, UpdateArticle } from "../../../services/articleService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import CreateArticleModal from "./Create/CreateArticle";
import { GetFiltersForCategory } from "../../../services/categoryService";

function ArticleTable() {

    const [articleData, setArticleData] = useState([])
    const [categoryFilters, setFilters] = useState([])
    const [selectedArticle, setSelectedArticle] = useState(null)
    let { categoryId } = useParams();
    const [show, setShow] = useState(false);

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
    
    function renderData(){
        if (!articleData || articleData.length === 0){
            return
        }
        return articleData.map((data, index) => (
        <tr>
            <td>{index}</td>
            <td>{data.name}</td>
            <td>{data.description}</td>
            <td>{data.cost}</td>
            <td>{data.type}</td>
            <td>{data.buys}</td>
            <td>
                <Button onClick={() => onDeleteArticle(data.id)}> 
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </Button>
                <Button onClick={() => onEditArticle(data)}> 
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                </Button>
            </td>
        </tr>
        ))
    }

    function onCreateArticle(article){
        CreateArticle(categoryId, article).then(data => {
            setArticleData(articles => 
                {articles.push({...article, id: data.id})
                return articles
            })
            handleClose()
        })
    }

    function onEditArticle(article){
        setSelectedArticle(selected => article)
        setShow(true) 
    }

    function onSaveEdit(article, id){
        UpdateArticle(article, categoryId, id).then(data => {
            handleClose()
            console.log(data);
        })
    }

    function onDeleteArticle(articleId){
        DeleteArticle(categoryId, articleId).then(data => {
            setArticleData(articles => articles.filter(article => article.id !== articleId))
        })
    }
    return (
    <>
        <CreateArticleModal article={selectedArticle} onSaveEdit={onSaveEdit} onCreate={onCreateArticle} filters={categoryFilters} show={show} onClose={handleClose}/>
        <Container>
        <Row className="header">
            <Col lg={{span: 5, offset: 1}}>
                <search></search>
            </Col>
            <Col lg={{span: 2, offset: 10}}>
            <Button onClick={handleShow}>
                    New <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            </Button>
            </Col>
        </Row>
        <Row lg={20}>
            <Col lg={{ span: 18, offset: 0}}>
            <Table className="table" hover bordered responsive striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Text</th>
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