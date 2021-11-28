import React from "react";
import { useRef } from "react";
import { useState } from "react";

function HeaderInput(props){

    const keyInput = useRef();
    const valueInput = useRef();

    const [notDeleted, setNotDeleted] = useState(true);

    const handleKeyChange = (event) => {

        keyInput.current.value = event.target.value;
        props.callBack(props.id, props.type,  keyInput.current.value, valueInput.current.value, props.headerKeys, props.headerValues);
    }

    const handleValueChange = (event) => {

        valueInput.current.value = event.target.value;
        props.callBack(props.id, props.type, keyInput.current.value, valueInput.current.value, props.headerKeys, props.headerValues);
    }

    const delFunction = () =>{

        setNotDeleted(false);
        props.callBack(props.id, props.type, "", "", props.headerKeys, props.headerValues);
    }

    return(

        <>
        {notDeleted&&

            <>
            
                <input type="text" className="headerInput left" placeholder={` ${props.type} Header Key:`} ref={keyInput} onChange={handleKeyChange}/>
            
                <input type="text" className="headerInput right" placeholder={` ${props.type} Header Value:`} ref={valueInput} onChange={handleValueChange}/>
                
                <button type={"button"} onClick={delFunction} className="remove">-</button>

                <br/><br/>
            </>
        }

        </>
    );
}

export default HeaderInput;