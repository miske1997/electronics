import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Outlet, useNavigate} from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    function GoTo(url){
        navigate(url)
    }

    return (
        <>
        <Navbar expand="md" bg='dark' data-bs-theme="dark" className="bg-body-tertiary ">
            <Container fluid>
                <Navbar.Brand href="/home">Anika Panika</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                            Offcanvas
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link onClick={() => GoTo("/home")}>Home</Nav.Link>
                            <Nav.Link onClick={() => GoTo("/browse")}>Products</Nav.Link>
                            <Nav.Link onClick={() => GoTo("/browse")}>About Us</Nav.Link>
                            <NavDropdown
                                title="Dropdown"
                                id={`offcanvasNavbarDropdown-expand-md`}
                            >
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                            <Nav.Link onClick={() => GoTo("/cart")}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                        
            </Container>
        </Navbar>

        <Outlet></Outlet>
        </>
    );
}

export default NavBar;