import { Badge, Overlay, Tooltip } from "react-bootstrap";
import { useRef, useState } from 'react';

function BadgeWithTooltip({text = "", tooltip = ""}) {

    const [show, setShow] = useState(false);
    const target = useRef(null);

    return (
        <>
            <Badge style={{margin: "5px",  width: "min-content"}} ref={target} onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                {text}
            </Badge>
            <Overlay target={target.current} show={show} placement="left">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {tooltip}
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default BadgeWithTooltip;