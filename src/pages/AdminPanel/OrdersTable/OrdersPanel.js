import "./OrdersPanel.css"
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { GetOrders} from "../../../services/articleService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import OrderModal from "./OrderModel/OrderModal";

function OrdersTable() {

    const [ordersData, setOrderseData] = useState([])
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setSelectedOrder(null)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        GetOrders().then(data => {
            setOrderseData(data)
        })
    }, []);
    
    function renderData(){
        if (!ordersData || ordersData.length === 0){
            return
        }
        console.log(ordersData);
        return ordersData
        .sort((orderA, orderB) => new Date(orderA.orderTime.seconds*1000) - new Date(orderB.orderTime.seconds*1000))
        .map((data, index) => (
        <tr>
            <td>{index}</td>
            <td>{data.name + " " + data.lastName}</td>
            <td>{data.address}</td>
            <td>{data.zip}</td>
            <td>{data.state}</td>
            <td>{data.city}</td>
            <td>{data.email}</td>
            <td>
                <Button onClick={() => onDisplayArticlesOfOrder(data)}>
                    See Articles In Order
                    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                </Button>
            </td>
        </tr>
        ))
    }

    function onDisplayArticlesOfOrder(order){
        setSelectedOrder(order)
        handleShow()
    }
    return (
    <>
        <OrderModal onClose={handleClose} order={selectedOrder} show={show}></OrderModal>
        <Container>
        <Row className="header">
        </Row>
        <Row lg={20}>
            <Col lg={{ span: 18, offset: 0}}>
            <Table className="table" hover bordered responsive striped>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Addres</th>
                        <th>Zip</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Email</th>
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

export default OrdersTable;