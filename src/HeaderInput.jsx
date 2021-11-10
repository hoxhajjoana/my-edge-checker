import React from "react";
import { useRef } from "react";

function HeaderInput(props){

    const keyInput = useRef();
    const valueInput = useRef();

    const handleKeyChange = (event) => {


        keyInput.current.value = event.target.value;
        //console.log(keyInput.current.value)

        props.callBack(props.id, props.type,  keyInput.current.value, valueInput.current.value, props.headerKeys, props.headerValues);
    }

    const handleValueChange = (event) => {
        valueInput.current.value = event.target.value;
        //console.log(valueInput.current.value)
        props.callBack(props.id, props.type, keyInput.current.value, valueInput.current.value, props.headerKeys, props.headerValues);
    }

    return(

        <>
        
        <label>
            {props.type} Header Key:
            <input type="text" ref={keyInput} onChange={handleKeyChange}/>
        </label>

        <label>
            {props.type} Header Value:
            <input type="text" ref={valueInput} onChange={handleValueChange}/>
        </label>

        <br/><br/>

        </>
    );
}

export default HeaderInput;