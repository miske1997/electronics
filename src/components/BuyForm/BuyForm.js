import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function BuyForm({ onSubmit = () => { } }) {

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        console.log(form[0].value);
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === true) {

            const name = form[0].value
            const lastName = form[1].value
            const email = form[2].value
            const address = form[3].value
            const phone = form[4].value
            const city = form[5].value
            const state = form[6].value
            const zip = form[7].value
            const saveDetails = form[8].value

            onSubmit({name, lastName, email, address, city, state, zip, saveDetails})
        }

        setValidated(true);

    };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required placeholder="First Name" />
                    <Form.Control.Feedback type="invalid">
                        Please write first name.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridLastname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required placeholder="Last Name" />
                    <Form.Control.Feedback type="invalid">
                        Please write last name.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control required type="email" placeholder="Enter email" />
                    <Form.Control.Feedback type="invalid">
                        Please write a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control required placeholder="1234 Main St" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control required placeholder="064-558-412" />
            </Form.Group>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control required />
                </Form.Group>
            </Row>

            {/* <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Save my details" />
            </Form.Group> */}

            <Button variant="primary" type="submit">
                Order
            </Button>
        </Form>
    );
}

export default BuyForm;