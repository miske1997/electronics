import { useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";


function CreateArticleModal({article = null, show = false, onClose = () => {}, onCreate = () => {},onSaveEdit = () => {}, filters = []}) {

    const submitBtnRef = useRef()

    function RenderFilterFields(){
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

    function submit(event){
        let form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const newArticle = {
            name: form[0].value,
            description: form[1].value,
            specification: form[2].value,
            cost: form[3].value,
            type: form[4].value,
            buys: 0,
        }
        if (article)
            onSaveEdit(newArticle, article.id)
        else
            onCreate(newArticle)
    }
    function triggrSubmit(){
        submitBtnRef.current.click()
    }

    return ( 
        <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                    <Form.Control defaultValue={article !== null ? article.cost : 0} type="number" placeholder="0" />
                </Form.Group>
                <button ref={submitBtnRef} style={{display: "none"}} variant="primary" type="submit"/>
                {RenderFilterFields()}
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