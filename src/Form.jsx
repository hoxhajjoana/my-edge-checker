import React, {useRef, useState } from "react";
import HeaderInput from "./HeaderInput";
import RequestTable from "./RequestTable";
import ResponseTable from "./ResponseTable";
import Modal from "./Modal";


function Form(props){

    let inputURL = useRef();
    let searchString = useRef();

    //const [headerInputs, setHeaderInputs] = useState([]);

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


    const [requestChange, setRequestChange] = useState(1);
    const [responseChange, setResponseChange] = useState(1);

    const [requestContents, setRequestContents] = useState([<HeaderInput type="Request" callBack={getHeaderInput}
        headerKeys={requestHeadersKeyArray} headerValues={requestHeadersValueArray} key={requestChange} id={requestChange}/>]);
    const [responseContents, setResponseContents] = useState([<HeaderInput type="Response" callBack={getHeaderInput} 
    headerKeys={responseHeadersKeyArray} headerValues={responseHeadersValueArray} key={responseChange} id={responseChange}/>]);

    
    const [sent, setSent] = useState(false)
    const [response, setResponse] =  useState(null)
    const [loading, setLoading] = useState(false)

    const [comError, setComError] = useState(false);
    const [notOk, setNotOk] = useState(false);
    const [inputNeeded, setInputNeeded] = useState(false);


    const handleInputURLChange = (event) => {
        inputURL.current.value = event.target.value;
        console.log(inputURL.current.value)
    }

    const handleSearchStringChange = (event) => {
        searchString.current.value = event.target.value;
        console.log(searchString.current.value)
    }

    async function handleSubmit(event){

        event.preventDefault();

        if(!inputURL.current.value){
            setInputNeeded(true);
            return false;
        }
        

        setResponse(null);

        const requestHeaders = {};
        const responseHeaders = {};
        
        for(let i = 0; i < responseHeadersKeyArray.length; i++){

            if(responseHeadersKeyArray[i]!==""){
                responseHeaders[responseHeadersKeyArray[i]] = responseHeadersValueArray[i];
            }
        }

        for(let i = 0; i < requestHeadersKeyArray.length; i++){

            if(requestHeadersKeyArray[i]!==""){
                requestHeaders[requestHeadersKeyArray[i]] = requestHeadersValueArray[i];
            }
        }

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

        setLoading(true);
        let a = await fetch('http://54.36.202.173:8080/edge-check', requestOptions).catch(err => {
            console.error(err)
            setComError(true);
            debugger
            return ("error")
        })
        setLoading(false);

        

        if(a !== "error"){
            if(a.ok){
                let jsonRespose = await a.json()
                console.log(jsonRespose)
                setResponse(jsonRespose)
            }
            else{
                setNotOk(true);
            }
        }

        setSent(true);

        return false;

    }  
    

    return(
        
        <>
        <form onSubmit={handleSubmit}> 

            <input placeholder="Input URL:" type="text" ref={inputURL} onChange={handleInputURLChange}/>

            <br/><br/>
            <div style={{display:"flex", justifyContent:"center", width:"100%"}}>

                <div style={{width:"50%"}}>
                    <label>
                        Request Headers 
                    </label>

                    <button type={"button"} onClick={
                        ()=>{
                            setRequestChange(requestChange+1);
                            setRequestContents([...requestContents, <HeaderInput type="Request" callBack={getHeaderInput}
                            headerKeys={requestHeadersKeyArray} headerValues={requestHeadersValueArray} key={requestChange} id={requestChange}/> ])
                        }
                    }>+</button>
                    <br/><br/>
                    {requestContents}
                </div>
                
                <div style={{width:"51%"}}>
                    <label>
                        Response Headers 
                    </label>
                    <button type={"button"} onClick={
                        ()=>{
                            setResponseChange(responseChange+1);
                            setResponseContents([...responseContents, <HeaderInput type="Response" callBack={getHeaderInput} 
                                headerKeys={responseHeadersKeyArray} headerValues={responseHeadersValueArray} key={responseChange} id={responseChange}/>])
                        }

                    }>+</button>
                    <br/><br/> 
                    
                    {responseContents}
                </div>
            </div>

            <input placeholder="Search String:" type="text" ref={searchString} onChange={handleSearchStringChange}/>

            <br/><br/>

            <input type="submit" value="Submit"/>        
            
        </form>

        <div>
            
            {loading && "Loading..."}
            <br/>
            {sent && response && !comError && !notOk && <RequestTable url={response.url} responseHeaders={response.responseHeaders} searchString={response.searchStrings} requestHeaders={response.requestHeaders} errorMessages={response.errorMessages} />}
            
            <br/>

            {sent && response && !comError && !notOk && <ResponseTable response={response}/>}
            
        </div>
        <div>
            {/* MODALS */}
            {comError && <Modal text="Communication error. Please try again." close={() => {setComError(false)}}/>}

            {notOk && <Modal text="Not an error, but not okay either " close={() => {setNotOk(false)}}/>}

            {inputNeeded && <Modal text="You need to enter a URL before submitting" close={()=>{setInputNeeded(false)}}/>}
        </div>
    </>

    );
}

export default Form;