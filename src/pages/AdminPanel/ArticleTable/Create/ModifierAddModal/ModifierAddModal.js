import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";


function ModifierAddModal({ show = false, modifier = null, onAdd = () => { }, onClose = () => { }, }) {

    const submitBtnRef = useRef()
    const formRef = useRef()

    const [items, setItems] = useState([])
    
    useEffect(() => {
        if (modifier) {
            setItems(modifier.items.map((value, index) => {
                return (
                    <FormGroup style={{ position: "relative" }}>
                        <Form.Control defaultValue={value} className="mb-3" type="text">
                        </Form.Control>
                        <FontAwesomeIcon onClick={(event) => removeItem(event)} style={{ position: "absolute", right: "1rem", top: "10px" }} icon={faX}></FontAwesomeIcon>
                    </FormGroup>
                )
            }))
        }
        else {
            setItems([])
        }

    }, [modifier, show]);

    function onInputChange(event){
        const value = event.target.value
        let fields = value.split("\n")
        if (fields.length === 1)
            return

        fields = fields.map(element => {
            return element.replace(/\ \(.*\)/,'');
        });
        fields.forEach(element => {
            AddItem(element)
        });
        console.log(fields);
    }

    function removeItem(value){
        console.log(value);
        console.log(items);
        return
        const index = items.find(el => {
            console.log(el);
            return el === value})
        console.log(index);
        items.splice(index, 1)
        console.log(items);
        setItems(items)
    }

    function triggrSubmit() {
        submitBtnRef.current.click()
    }
    function GetItemsData(form) {
        const modifiers = []
        let i = 2
        while (form[i] && form[i].value) {
            if (form[i].value !== "")
                modifiers.push(form[i].value)
            i++
        }
        return modifiers
    }
    function submit(event) {
        let form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        let modifier = { name: form[0].value, items: GetItemsData(form) }
        onAdd(modifier)

    }

    function AddItem(value) {
        setItems(items => [...items, (
            <FormGroup key={items.index} style={{ position: "relative" }}>
                <Form.Control defaultValue={value ?? ""} className="mb-3" type="text">
                </Form.Control>
                <FontAwesomeIcon onClick={(event) => removeItem(event.target.parentElement)} style={{ position: "absolute", right: "1rem", top: "10px" }} icon={faX}></FontAwesomeIcon>
            </FormGroup>
        )])
    }
    
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Modifier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submit} >
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={modifier !== null ? modifier.name : ""} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Paste Input</Form.Label>
                        <Form.Control onChange={onInputChange} as="textarea" rows={3} type="text" placeholder="Paste" />
                    </Form.Group>
                    <div style={{ maxHeight: "70vh", overflow: "auto" }}>
                        {items}
                    </div>
                    <FormGroup ref={formRef}>
                    </FormGroup>
                    <Button onClick={AddItem}>Add Item</Button>
                    <button ref={submitBtnRef} style={{ display: "none" }} variant="primary" type="submit" />
                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={triggrSubmit}>
                    {modifier ? "Save Changes" : "Create"}
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default ModifierAddModal;