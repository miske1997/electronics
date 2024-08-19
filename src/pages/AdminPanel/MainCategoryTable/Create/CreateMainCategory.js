import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

function CreateMainCategory({filters = [], category = null, show = false, onClose = () => { }, onCreate = () => { }, onSaveEdit = () => { }}) {
    const submitBtnRef = useRef()

    function submit(event) {
        let form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const newCategory = {
            name: form[0].value,
            description: form[1].value,
            buys: 0,
        }
        
        if (category)
            onSaveEdit(newCategory, category.id)
        else
            onCreate(newCategory)
    }

    function triggrSubmit() {
        submitBtnRef.current.click()
    }
    return ( 
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Main Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={category !== null ? category.name : ""} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={category !== null ? category.description : ""} as="textarea" rows={3} type="text" placeholder="Description" />
                    </Form.Group>
                    <button ref={submitBtnRef} style={{ display: "none" }} variant="primary" type="submit" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={triggrSubmit}>
                    {category ? "Save Changes" : "Create"}
                </Button>

            </Modal.Footer>
        </Modal>
     );
}

export default CreateMainCategory;