import React, { useState } from "react";
import Draggable from "react-draggable";
import { Paper, Dialog, DialogTitle, DialogContent } from "@mui/material";

function PaperComponent(props) {

    const nodeRef = React.useRef(null)

    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
            nodeRef={nodeRef}
            bounds="parent" /* Dialogs cannot move past the window boundaries */
        >
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    )
}

export default function ModulePopUp({ item }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Clear open dialgos by refreshing the page
    const handleClear = () => {
        window.location.reload(false);
    }

    return (
        <div>
            {/* OnClick behaviour for Clean up function differs to other modules */}
            <button className="module-btn" onClick={item.name !== "Clean up" ? handleClickOpen : handleClear}>
                <i className={item.iconClassName}></i>
                <span>{item.name}</span>
            </button>
            {/* Dialog is created if it is a module */}
            {item.name !== "Clean up" &&
                <Dialog
                    open={open}
                    PaperComponent={PaperComponent}
                    PaperProps={{ elevation: 0, variant: 'outlined', style: { pointerEvents: 'auto', position: "relative", left: item.positionLeft, bottom: item.positionBottom } }}
                    aria-labelledby="draggable-dialog-title"
                    hideBackdrop // Disable the backdrop color/image
                    disableEnforceFocus // Let the user focus on elements outside the dialog
                    style={{ pointerEvents: "none" }} // This was the key point, reset the position of the dialog, so the user can interact with other elements
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title"  className="toolTheme" >
                        {item.name}
                        <button className='dialog-close' onClick={handleClose}>
                            <i className="bi bi-x-lg"></i>
                        </button>
                    </DialogTitle>
                    <DialogContent  className="toolThemeContent p-2" >
                        {item.content}
                    </DialogContent>
                </Dialog>}
        </div>
    );
}