import "./CategoryPanel.css"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { CreateNewCategory, GetAllCategorys, GetFiltersForCategory, UpdateCategory } from "../../../services/categoryService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CreateCategory from "./Create/CreateCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

function CategoryPage() {

    const [categortData, setCategoryData] = useState([])
    const [show, setShow] = useState(false);
    const [categoryFilters, setFilters] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null)
    const navigate = useNavigate()

    const handleClose = () => {
        setSelectedCategory(null)
        setFilters([])
        setShow(false)
    }
    const handleShow = () => {
        setShow(true);
    }

    useEffect(() => {
        GetAllCategorys().then(data => {
            setCategoryData(data)
        })
        
    }, []);
    function onEditCategory(category) {
        setSelectedCategory(selected => category)
        GetFiltersForCategory(category.id).then(filters => {
            setFilters(filters)
        })
        setShow(true)
    }
    function renderData() {
        if (!categortData || categortData.length === 0) {
            return
        }
        console.log(categortData);
        return categortData.map((data, index) => (
            <tr>
                <td>{index}</td>
                <td>{data.name}</td>
                <td><Button onClick={() => onArticlesClick(data.id)}> Articles </Button></td>
                <td>
                    <Button onClick={() => onEditCategory(data)}>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Button>
                </td>
            </tr>
        ))
    }
    function onCreate(category, mainId, filters){
        console.log(mainId);
        
        CreateNewCategory(category, mainId, filters).then(data => {
            setCategoryData(categorys => {
                categorys.push({ ...data, id: data.id })
                return categorys
            })
            handleClose()
        })
    }
    function onEdit(category, id, mainId, filters){
        console.log(filters);
        UpdateCategory(category, id, mainId, filters).then(data => {
            handleClose()
        })
    }
    function onArticlesClick(categoryName) {
        navigate(`/admin/${categoryName}`)
    }

    return (
        <>
            <CreateCategory filters={categoryFilters} category={selectedCategory} onSaveEdit={onEdit} onCreate={onCreate} onClose={handleClose} show={show} ></CreateCategory>
            <Container className="category-panel">
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
                <Row lg={20}>
                    <Col lg={{ span: 18, offset: 0 }}>
                        <Table className="table" hover bordered responsive striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Articles</th>
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

export default CategoryPage;