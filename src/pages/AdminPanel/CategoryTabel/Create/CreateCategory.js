import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModifierAddModal from "../../ArticleTable/Create/ModifierAddModal/ModifierAddModal";
import { GetMainCategorys } from "../../../../services/categoryService";


function CreateCategory({filters = [], category = null, show = false, onClose = () => { }, onCreate = () => { }, onSaveEdit = () => { }}) {
    const submitBtnRef = useRef()
    const [showModal, setShow] = useState(false);
    const [modifiers, setModifiers] = useState({});
    const [mainCategorys, setMainCategorys] = useState([]);
    const [modifierEdited, setModifierEdited] = useState(null);

    useEffect(() => {
        console.log(filters);
        const modifiersList = {}
        filters.forEach(filter => {
            console.log(filter);
            modifiersList[filter.name] = filter.options
        })
        setModifiers(modifiersList)
    }, [filters]);
    useEffect(() => {
        GetMainCategorys().then(data => setMainCategorys(data))

    }, []);
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
    function GetFiltersFromModifiers(){
        const newFilters = []
        for (const key in modifiers) {
            if (Object.prototype.hasOwnProperty.call(modifiers, key)) {
                const element = modifiers[key];
                newFilters.push({name: key,propName: key.toLowerCase() ,options: [...element]})
            }
        }
        return newFilters
    }
    function submit(event) {
        let form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        const newCategory = {
            name: form[0].value,
            description: form[1].value,
            mainCategory: category ? category.mainCategory : null,
            buys: 0,
        }
        
        if (category)
            onSaveEdit(newCategory, category.id, form[2].value, GetFiltersFromModifiers())
        else
            onCreate(newCategory, form[2].value, GetFiltersFromModifiers())
    }
    function RenderMainCategorySelect(){
            return (
                <Form.Group className="mb-3" controlId="main-categorys">
                    <Form.Label>Main Category</Form.Label>
                    <Form.Select defaultValue={category && category.mainCategory ? category.mainCategory.id : mainCategorys[0] ? mainCategorys[0].id : ""} id="main-categorys">
                        {mainCategorys.map(main => {
                            return (<option selected={category && category.mainCategory && main && category.mainCategory.id === main.id} value={main ? main.id : ""}>{main.name}</option>)
                        })}
                    </Form.Select>
                </Form.Group>
            )
    }
    function RanderModifiers() {
        const modifiersRenderd = []
        for (const key in modifiers) {
            if (Object.hasOwnProperty.call(modifiers, key)) {
                const modifier = modifiers[key];
                modifiersRenderd.push((
                    <div style={{ display: "flex" }}>
                        <p>{key}</p>
                        <div style={{ flexGrow: "1" }}></div>
                        <Button onClick={() => { setModifierEdited({ name: key, items: modifiers[key] }); handleShow() }}>Edit</Button>
                        <Button onClick={() => setModifiers(mod => { delete mod[key]; return { ...mod } })}>Delete</Button>
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
        <Modal backdrop="static" show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ModifierAddModal modifier={modifierEdited} onAdd={AddModifier} show={showModal} onClose={handleClose} ></ModifierAddModal>
                <Form onSubmit={submit} >
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control defaultValue={category !== null ? category.name : ""} type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control defaultValue={category !== null ? category.description : ""} as="textarea" rows={3} type="text" placeholder="Description" />
                    </Form.Group>
                    {RenderMainCategorySelect()}
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
                    {category ? "Save Changes" : "Create"}
                </Button>

            </Modal.Footer>
        </Modal>
     );
}

export default CreateCategory;