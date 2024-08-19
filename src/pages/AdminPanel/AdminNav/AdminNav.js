import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router";


function AdminNav() {

    const navigate = useNavigate();

    function GoTo(url){
        navigate(url);
    }

    return ( 
        <>
        <Navbar sticky='top' expand="md" bg='dark' data-bs-theme="dark" className="bg-body-tertiary navbar-main ">
            <Container fluid>
                <Navbar.Brand style={{fontSize: "inherit"}} href="/">Anika Panika</Navbar.Brand>
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
                            <Nav.Link onClick={() => GoTo("/admin/main-categorys")}>Main Categorys</Nav.Link>
                            <Nav.Link onClick={() => GoTo("/admin")}>Categorys</Nav.Link>
                            <Nav.Link onClick={() => GoTo("/admin/orders")}>Orders</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
                        
            </Container>
        </Navbar>

        <Outlet></Outlet>
        </>
     );
}

export default AdminNav;