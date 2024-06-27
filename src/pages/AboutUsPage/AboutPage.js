import { Col, Container, Row } from "react-bootstrap";
import "./AboutPage.css"

function AboutPage() {

    return (
        <Container className="about-page">
            <Row>
                <Col style={{ textAlign: "left" }}>
                    <div style={{ marginTop: "15rem" }}></div>
                    <h1 style={{ marginBlock: "3rem", fontSize: "90px" }}>Anika panika</h1>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta velit tellus, id feugiat erat viverra in. Pellentesque sed mauris vel metus finibus aliquam.</h2>
                </Col>
                <Col lg={6}>
                    <img className="img-to-mask" src="https://www.nextpcb.com/uploads/images/202303/20/1679303211-0734-cavktR.jpg" alt="none"></img>
                </Col>
            </Row>
            <Row>
                <Col lg={6}>
                    <img className="img-to-mask" src="https://www.nextpcb.com/uploads/images/202303/20/1679303211-0734-cavktR.jpg" alt="none"></img>
                </Col>
                <Col style={{paddingLeft: "4rem", textAlign: "left" }}>
                    <div style={{ marginTop: "15rem" }}></div>
                    <h1 style={{ marginBlock: "3rem", fontSize: "90px" }}>Anika panika</h1>
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam porta velit tellus, id feugiat erat viverra in. Pellentesque sed mauris vel metus finibus aliquam.</h2>
                </Col>
            </Row>
        </Container>
    )

}

export default AboutPage;