import "./CategoryPanel.css"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { GetAllCategorys } from "../../../services/categoryService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function CategoryPage() {

    const [categortData, setCategoryData] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        GetAllCategorys().then(data => {
            setCategoryData(data)
        })
    }, []);
    
    function renderData(){
        if (!categortData || categortData.length === 0){
            return
        }
        console.log(categortData);
        return categortData.map((data, index) => (
        <tr>
            <td>{index}</td>
            <td>{data.name}</td>
            <td><Button onClick={() => onArticlesClick(data.id)}> Articles </Button></td>
        </tr>
        ))
    }

    function onArticlesClick(categoryName){
        navigate(`/admin/${categoryName}`)
    }

    return (
        <Container className="category-panel">
        <Row lg={20}>
            <Col lg={{ span: 18, offset: 0}}>
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
    );
}

export default CategoryPage;