import React from "react";

function EdgeCheckerForm(){

    const [requestHeaderInputs, setRequestHeaderInputs] = useState(["requestHeaderInput-0"]);
    const [requestHeaderKeys, setRequestHeaderKeys] = useState([]);
    const [requestHeaderValues, setRequestHeaderValues] = useState([]);

    const [responseHeaderInputs, setResponseHeaderInputs] = useState(["responseHeaderInput-0"]);
    const [responseHeaderKeys, setResponseHeaderKeys] = useState([]);
    const [responseHeaderValues, setResponseHeaderValues] = useState([]);

    const [sent, setSent] = useState(false);
    const [response, setResponse] =  useState(null);

    const [loading, setLoading] = useState(false);
    const [clear, setClear] = useState(false);


    let inputUrl = useRef(null);
    let searchString = useRef(null);

    function addRequestHeaderInput(){

        const newInput = [`requestHeaderInput-${requestHeaderInputs.length}`];
        setRequestHeaderInputs([...requestHeaderInputs, newInput]);
       
    }

    function addResponseHeaderInput(){

        const newInput = [`input-${responseHeaderInputs.length}`];
        setResponseHeaderInputs([...responseHeaderInputs, newInput]);
       
    }

    async function handleSubmit(event){

        setResponse(null);

        if(inputUrl.current.value === null || inputUrl.current.value === undefined || inputUrl.current.value === ""){
            alert("Input URL required"); ////create a modal here instead
            return;
        }

       
        const requestHeadersk = requestHeaderKeys;
        const requestHeadersv = requestHeaderValues;
        const requestHeaders = {};

        for(let i=0; i<requestHeadersk.length; i++){

            let headerk = requestHeadersk[i]
            let headerv= requestHeadersv[i]
            
            requestHeaders[headerk] = headerv;
        }     

        const responseHeadersk = responseHeaderKeys
        const responseHeadersv = responseHeaderValues
        const responseHeaders = {}

        for(let i=0; i<responseHeadersk.length; i++){

            headerk = responseHeadersk[i]
            headerv= responseHeadersv[i]

            responseHeaders[headerk] = headerv
        }
       
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({ 
                "url": inputUrl.current.value,
                "ips": null,
                "searchStrings": [searchString.current.value],
                "requestHeaders": requestHeaders,
                "responseHeaders": responseHeaders
            })
        }
    
        setLoading(true);

        let a = await fetch('http://54.36.202.173:8080/edge-check', requestOptions).catch(
            err => {
                alert("Communication Error. Please try again");
                console.error(err);
                return ("error");
            }
        );

        setLoading(false);

        console.log(a);

        if(a !== "error"){
            if(a.ok){
                let jsonRespose = await a.json();
                setResponse(jsonRespose);
            }
            else{
                let e = await a.text();
                alert(e);
            }
        }

        console.log("response");
        console.log(response);
        setSent(true);       

    }

    function handleInputURLChange(event){
        inputURL.current.value = event.target.value;
    }

    function handleRequestHeaderKey(event){
        if(event.target.name < requestHeaderKeys.length){
            requestHeaderKeys[event.target.name] = event.target.value;
        }
        else{
            let data = requestHeaderKeys;
            data.push(event.target.value);
            setRequestHeaderKeys(data);
        }
    }

    function handleRequestHeaderValue(event){
        if(event.target.name < requestHeaderValues.length){
            requestHeaderValues[event.target.name] = event.target.value;
        }
        else{
            let data = requestHeaderValues
            data.push(event.target.value);
            setRequestHeaderValues(data);
        }
    }

    function handleResponseHeaderKey(event){
        if(event.target.name < responseHeaderKeys.length){
            responseHeaderKeys[event.target.name] = event.target.value;
        }
        else{
            var data = responseHeaderKeys
            data.push(event.target.value);
            setResponseHeaderKeys(data);
        }
    }
    
    function handleResponseHeaderValue(event){
        if(event.target.name < responseHeaderValues.length){
            responseHeaderValues[event.target.name] = event.target.value;
        }
        else{
            var data = responseHeaderValues;
            data.push(event.target.value);
            setResponseHeaderValues(data);
        }
    }

    function handleSearchStringChange(event){
        searchString.current.value = event.target.value;
    }

    function handleClear(event){

        
        Array.from(document.querySelectorAll("input")).forEach(
            input => (input.value = "")
        );
          
        setClear(true);
        inputUrl.current.value = null;
        searchString.current.value = null;
        setRequestHeaderInputs(["requestHeaderInput-0"]);
        setResponseHeaderInputs(["responseHeaderInput-0"]);
        setRequestHeaderKeys([]);
        setRequestHeaderValues([]);
        setResponseHeaderValues([]);
        setResponseHeaderKeys([]);

    }


    

}