import React from "react";

function Modal(props){

    return(
        <div className="modal">

            <div className="modal-content">
                <span onClick={props.close} className="close">&times;</span>
                <p>{props.text}</p>
            </div>
        </div>
        
    );
}

export default Modal;
