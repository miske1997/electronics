import "./OrdersPanel.css"
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import OrderModal from "./OrderModel/OrderModal";
import * as orderService from "../../../services/orderService";

function OrdersTable() {

    const [ordersData, setOrderseData] = useState([])
    const [orderType, setOrderType] = useState("Pending")
    const [selectedOrder, setSelectedOrder] = useState({ name: "", articles: [], completed: false, orderTime: new Date() })
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setSelectedOrder({ name: "", articles: [], completed: false, orderTime: new Date() })
        setShow(false)
    }
    const handleShow = () => setShow(true);

    useEffect(() => {
        orderService[`Get${orderType}Orders`]()
            .then(data => {
                setOrderseData(data)
            })
    }, [orderType]);

    function renderData() {
        if (!ordersData || ordersData.length === 0) {
            return
        }

        return ordersData
            .sort((orderA, orderB) => new Date(orderA.orderTime.seconds * 1000) - new Date(orderB.orderTime.seconds * 1000))
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
                            Artikli u Narudzbini
                        </Button>
                    </td>
                    <td>
                        <Button >
                            Racun
                        </Button>
                    </td>
                </tr>
            ))
    }

    function onDisplayArticlesOfOrder(order) {
        setSelectedOrder(order)
        handleShow()
    }

    function OrderTypeChanged(event) {
        setOrderType(event.target.value)
    }

    function CompleteOrder() {
        orderService.AddCompleatedOrder({...selectedOrder, completed: true})
            .then(() => {
                orderService.DeletePendingOrder(selectedOrder.id)
                setOrderseData(ordersData.filter(order => order.id !== selectedOrder.id))
                handleClose()
            })
        //.error(() => )  show error message
    }

    return (
        <>
            <OrderModal onClose={handleClose} triggrSubmit={CompleteOrder} order={selectedOrder} show={show}></OrderModal>
            <Container>
                <div className="ordedr-controlles">
                    <Form.Control className="search" />
                    <div style={{ flexGrow: 1 }}></div>
                    <Form.Check
                        inline
                        onChange={OrderTypeChanged}
                        defaultChecked="true"
                        value="Pending"
                        label="Ne Obradjene"
                        name="group1"
                        type="radio"
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        onChange={OrderTypeChanged}
                        value="Completed"
                        label="Obradjene"
                        name="group1"
                        type="radio"
                        id={`inline-radio-2`}
                    />
                    <Form.Check
                        inline
                        onChange={OrderTypeChanged}
                        value="All"
                        name="group1"
                        label="Sve"
                        type="radio"
                        id={`inline-radio-3`}
                    />
                </div>
                <Row lg={20}>
                    <Col lg={{ span: 18, offset: 0 }}>
                        <Table className="table" hover bordered responsive striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Ime</th>
                                    <th>Adresa</th>
                                    <th>Zip</th>
                                    <th>Drzava</th>
                                    <th>Grad</th>
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