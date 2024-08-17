import { useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModifierAddModal from "./ModifierAddModal/ModifierAddModal";


function CreateArticleModal({ article = null, show = false, onClose = () => { }, onCreate = () => { }, onSaveEdit = () => { }, filters = [] }) {

    const submitBtnRef = useRef()
    const [showModal, setShow] = useState(false);
    const [modifiers, setModifiers] = useState({});
    const [modifierEdited, setModifierEdited] = useState(null);

    const handleClose = () => {
        setModifierEdited(null)
        setShow(false)
    }
    const handleShow = () => setShow(true);

    function AddModifier(mod) {
        setModifiers({ ...modifiers, [mod.name]: mod.items })
        console.log(modifiers);
        handleClose()
    }

    function RenderFilterFields() {
        return filters.map(filter => {
            return (
                <Form.Group className="mb-3" controlId={filter.name}>
                    <Form.Label>{filter.name}</Form.Label>
                    <Form.Select defaultValue={article !== null ? article[filter.name] : filter.options[0] ?? ""} id={filter.name}>
                        {filter.options.map(option => {
                            return (<option>{option}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
            )
        })

    }

    function getFilterData(form) {
        let data = {}
        filters.forEach((filter, index) => data[filter.propName] = form[4 + index].value)
        return data
    }

    function submit(event) {
        let form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const newArticle = {
            name: form[0].value,
            description: form[1].value,
            specification: form[2].value,
            cost: form[3].value,
            ...getFilterData(form),
            ...modifiers,
            buys: 0,
        }
        console.log(newArticle);
        return
        if (article)
            onSaveEdit(newArticle, article.id)
        else
            onCreate(newArticle)
    }
    function RanderModifiers() {
        const modifiersRenderd = []
        for (const key in modifiers) {
            if (Object.hasOwnProperty.call(modifiers, key)) {
                const modifier = modifiers[key];
                modifiersRenderd.push((
                    <div style={{ display: "flex" }}>
                        <p>{key}</p>
                        <div style={{flexGrow: "1"}}></div>
                        <Button onClick={() => {setModifierEdited({name: key, items: modifiers[key]}); handleShow()} }>Edit</Button>
                        <Button onClick={() => setModifiers(mod => {delete mod[key]; return {...mod}})}>Delete</Button>
                    </div>
                ))
            }
        }
        return modifiersRenderd
    }
    function triggrSubmit() {
        submitBtnRef.current.click()
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Article</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModifierAddModal modifier={modifierEdited} onAdd={AddModifier} show={showModal} onClose={handleClose} ></ModifierAddModal>
                <Form onSubmit={submit} >
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={article !== null ? article.name : ""} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={article !== null ? article.description : ""} as="textarea" rows={3} type="text" placeholder="Description" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formSpecification">
                        <Form.Label>Specification</Form.Label>
                        <Form.Control defaultValue={article !== null ? article.specification : ""} as="textarea" rows={3} type="text" placeholder="Specification" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCost">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control defaultValue={article !== null ? article.cost : ""} type="number" placeholder="0" />
                    </Form.Group>
                    {RenderFilterFields()}
                    {RanderModifiers()}
                    <Button onClick={handleShow}>Add Modifier</Button>
                    <button ref={submitBtnRef} style={{ display: "none" }} variant="primary" type="submit" />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={triggrSubmit}>
                    {article ? "Save Changes" : "Create"}
                </Button>

            </Modal.Footer>
        </Modal>
    );
}

export default CreateArticleModal;