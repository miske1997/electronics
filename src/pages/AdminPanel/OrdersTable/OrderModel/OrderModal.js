import { Button, ListGroup, Modal, Stack } from "react-bootstrap";
import CartItem from "../../../../components/CartItem/CartItem";


function OrderModal({ show = false, onClose = () => {}, triggrSubmit = () => { }, order = { name: "", articles: [] } }) {

    function RenderArticles() {
        if (!order){
            return
        }
        return order.articles.map(article => {
            return (
                <ListGroup.Item>
                    <CartItem display="true" item={article}></CartItem>
                </ListGroup.Item>
            )
        })
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    <ListGroup.Item>
                        <Stack direction="horizontal" gap={3}>
                            <p>Name:</p>
                            <p>{order ? `${order.name} ${order.lastName}` : ""}</p>
                        </Stack>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Stack direction="horizontal" gap={3}>
                            <p>Addres:</p>
                            <p>{order ? `${order.state}, ${order.address} , ${order.city} ${order.zip}` : ''}</p>
                        </Stack>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Stack direction="horizontal" gap={3}>
                            <p>Email:</p>
                            <p>{order ? order.email : ''}</p>
                        </Stack>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup>
                    {RenderArticles()}
                </ListGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={triggrSubmit}>
                    Place Order
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderModal;