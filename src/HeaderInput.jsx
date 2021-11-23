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
        
        <input type="text" className="headerInput" style={{marginLeft: 0, marginRight: "5%"}} placeholder={`${props.type} Header Key:`} ref={keyInput} onChange={handleKeyChange}/>
    
        <input type="text" className="headerInput" style={{marginLeft: "5%", marginRight: 0}} placeholder={`${props.type} Header Value:`} ref={valueInput} onChange={handleValueChange}/>
        
        <br/><br/>

        </>
    );
}

export default HeaderInput;