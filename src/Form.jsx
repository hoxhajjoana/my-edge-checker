import React, {useRef, useState } from "react";
import HeaderInput from "./HeaderInput";


function Form(props){

    let inputURL = useRef();
    let searchString = useRef();

    //const [headerInputs, setHeaderInputs] = useState([]);

    const [requestContents, setRequestContents] = useState([]);
    const [responseContents, setResponseContents] = useState([]);

    const [requestChange, setRequestChange] = useState(0);
    const [responseChange, setResponseChange] = useState(0);
    
    const [sent, setSent] = useState(false)
    const [response, setResponse] =  useState(null)
    const [loading, setLoading] = useState(false)


    const handleInputURLChange = (event) => {
        inputURL.current.value = event.target.value;
        console.log(inputURL.current.value)
    }

    const handleSearchStringChange = (event) => {
        searchString.current.value = event.target.value;
        console.log(searchString.current.value)
    }

    const [requestHeadersKeyArray, setRequestHeadersKeyArray ]= useState([]);
    const [requestHeadersValueArray,setRequestHeadersValueArray ]= useState([])
    const [responseHeadersKeyArray, setResponseHeadersKeyArray ]= useState([]);
    const [responseHeadersValueArray, setResponseHeadersValueArray ]= useState([]);

    const getHeaderInput = (id, type, key, value, headerKeys, headerValues) => {

        let keyArray = headerKeys;
        let valueArray = headerValues;

        keyArray[id] = key;
        valueArray[id] = value;

        if(type==="Request"){
            
            setRequestHeadersKeyArray(keyArray);
            setRequestHeadersValueArray(valueArray);

            console.log("request headers");
            console.log(requestHeadersKeyArray);
            console.log(requestHeadersValueArray);
        }
        else if(type==="Response"){
        
            keyArray[id] = key;
            valueArray[id] = value;
            
            setResponseHeadersKeyArray(keyArray);
            setResponseHeadersValueArray(valueArray);

            console.log("response headers");
            console.log(responseHeadersKeyArray);
            console.log(responseHeadersValueArray);
        }
    }    

    async function handleSubmit(){



        setResponse(null);

        const requestHeaders = {};
        const responseHeaders = {};

        console.log(responseHeadersKeyArray)
        console.log(responseHeadersValueArray)
        console.log(requestHeadersKeyArray)
        console.log(requestHeadersValueArray)

        for(let i = 0; i < responseHeadersKeyArray.length; i++){
            console.log("res")

            responseHeaders[responseHeadersKeyArray[i]] = responseHeadersValueArray[i];
        }
        if(responseHeaders === {}){
            responseHeaders[""] = "";
        }


        for(let i = 0; i < requestHeadersKeyArray.length; i++){
            console.log("req")

            requestHeaders[requestHeadersKeyArray[i]] = requestHeadersValueArray[i];
        }

        if(requestHeaders === {}){
            requestHeaders[""] = "";
        }

        console.log(requestHeaders)
        console.log(responseHeaders);

        debugger

        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                "url": inputURL.current.value,
                "ips": null,
                "searchStrings": [searchString.current.value],
                "requestHeaders": requestHeaders,
                "responseHeaders": responseHeaders
            })
        }

        console.log(requestOptions);
        debugger;

        setLoading(true);
        let a = await fetch('http://54.36.202.173:8080/edge-check', requestOptions).catch(err => {
            //alert("Communication Error. Please try again")
            console.error(err)
            alert("Communication Error. Please try again")
            debugger
            return ("error")
        })
        setLoading(false);

        console.log(a)

        if(a !== "error"){
            if(a.ok){
                let jsonRespose = await a.json()
                setResponse(jsonRespose)
            }
            else{
                let e = await a.text();
                alert(e)
            }
        }

        console.log("response")
        console.log(response)
        setSent(true)

        return false;

    }  
    

    return(
        
        <>
        <form onSubmit={handleSubmit}> 

            <label>
                Input URL:
                <input type="text" ref={inputURL} onChange={handleInputURLChange}/>
            </label>

            <br/><br/>

            <button type={"button"} onClick={
                ()=>{
                    setRequestChange(requestChange+1);
                    setRequestContents([...requestContents, <HeaderInput type="Request" callBack={getHeaderInput}
                    headerKeys={requestHeadersKeyArray} headerValues={requestHeadersValueArray} key={requestChange} id={requestChange}/> ])
                }
            }>Add Request Header</button>
            <br/><br/>
            {requestContents}

            <button type={"button"} onClick={
                ()=>{
                    setResponseChange(responseChange+1);
                    setResponseContents([...responseContents, <HeaderInput type="Response" callBack={getHeaderInput} 
                        headerKeys={responseHeadersKeyArray} headerValues={responseHeadersValueArray} key={responseChange} id={responseChange}/>])
                }

            }>Add Response Header</button>
            <br/><br/> 
            {responseContents}

            <label>
                Search String:
                <input type="text" ref={searchString} onChange={handleSearchStringChange}/>
            </label>

            <br/><br/>

            <input type="submit" value="Submit"/>        
            
        </form>

    <div>

        {loading && "Loading..."}

        {sent && response && "results here"}

    </div>
    </>

    );
}

export default Form;