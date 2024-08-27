import { Modal, Button } from "react-bootstrap";


function ConfirmationPopup({show = false, header = "", text = "", onConfirm = () => {}, onCancle = () => {}}) {
    return ( 
        <Modal show={show} onHide={onCancle}>
            <Modal.Header closeButton>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancle}>
                    Close
                </Button>
                <Button variant="secondary" onClick={onConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
     );
}

export default ConfirmationPopup;