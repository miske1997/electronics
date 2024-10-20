import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { GetAllCategorys, GetMainCategorys, UpdateMainCategory} from "../../../services/categoryService";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import CreateMainCategory from "./Create/CreateMainCategory";

function MainCategoryTable() {

    const [categortData, setCategoryData] = useState([])
    const [show, setShow] = useState(false);
    const [displayCategoryData, setDisplayCategoryData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const handleClose = () => {
        setSelectedCategory(null)
        setShow(false)
    }
    const handleShow = () => {
        setShow(true);
    }
    useEffect(() => {
        setDisplayCategoryData(categortData)
    }, [categortData]);
    
    useEffect(() => {
        GetMainCategorys().then(data => {
            setCategoryData(data)
        })
        
    }, []);
    function onEditCategory(category) {
        setSelectedCategory(selected => category)
        setShow(true)
    }
    function onCreate(category){
        CreateMainCategory(category).then(category => {
            setCategoryData(categorys => {
                categorys.push({ ...category, id: category.id })
                return categorys
            })
            alert("Ubaceno")
            handleClose()
        }).catch(err => {
            console.log(err)
            alert("Nije se lepo ubacilo")
        })
    }
    function onEdit(category, id){
        UpdateMainCategory(category, id).then(data => {
            alert("Ubaceno")
            handleClose()
        }).catch(err => {
            console.log(err)
            alert("Nije se lepo ubacilo")
        })
    }
    function renderData() {
        if (!categortData || categortData.length === 0) {
            return
        }
        return displayCategoryData.map((data, index) => (
            <tr>
                <td>{index}</td>
                <td>{data.name}</td>
                <td>
                    <Button onClick={() => onEditCategory(data)}>
                        <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                    </Button>
                </td>
            </tr>
        ))
    }
    function SearchInputChanged(event){
        if (event.code === "Enter")
        setDisplayCategoryData(categortData.filter(data => data.name.toLowerCase().includes(event.target.value.toLowerCase())))
    }

    return (
        <>
            <CreateMainCategory category={selectedCategory} onClose={handleClose} show={show} onSaveEdit={onEdit} onCreate={onCreate} ></CreateMainCategory>
            <Container className="category-panel">
                <Row className="header" lg={20}>
                    <Col md={4} className="search-form">
                        <Form.Control onKeyUp={SearchInputChanged}/>
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
                                    <th>Ime</th>
                                    <th></th>
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

export default MainCategoryTable;