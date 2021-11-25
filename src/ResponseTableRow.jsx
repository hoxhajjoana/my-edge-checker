import React, { useState } from "react";

function ResponseTableRow(props){

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    const headerCheckResults = props.results.headerCheckResults;

    const headerContents = [];

    const responseHeaders = props.responseHeaders;

    headerCheckResults.forEach( (header, index) => {

        let style={};

        if(responseHeaders[header.headerName]){


            console.log("response header value")
            console.log(responseHeaders[header.headerName]);
            console.log("header value")
            console.log(header.headerValue);
            console.log(responseHeaders[header.headerName]===header.headerValue)

            if(responseHeaders[header.headerName].replaceAll(" ", "")===(header.headerValue.replaceAll(" ", ""))){
                style =  {color: "green"}
            }
            else{ 
                style = {color: "red"}
            }
        }
        
        headerContents.push(<td style={style}key={index}> {header.headerValue}</td>)
    });

    
    const allResponse = [];

    let index=0;

    for(let property in props.results.allResponseHeaders){
        allResponse.push(`${property} : ${props.results.allResponseHeaders[property]} `);
        allResponse.push(<br key={index}/>)
        index+=1;
    }

    const status = props.results.statusCode;
    
    const string = props.results.stringSearchResults;

    return(
        <>
        <tr onClick={toggleClass} className="chosenHeaders">
            <td>
                {isActive?"˅":">"}
            </td>
            <td style={{color:
                status>=500?
                "red":
                (
                    status>=400?
                    "orange":
                    (
                        status >= 300?
                        "blue":
                        (
                            status>=200?
                            "green":
                            "black"
                        )
                    )
                )}
            }>
                {props.results.statusCode}
            </td>
            {string?<td style={{color:(string[Object.keys(string)[0]]==="Found"?"green":"red")}}>{string[Object.keys(string)[0]]}</td>:""}
            {headerContents}
        </tr>
        {props.results.str}
        <tr className="left">
            <td className={isActive?"":"hidden"} colSpan={string?headerContents.length+3:headerContents.length+3}>{allResponse}</td>
        </tr>
        </>
    );

}

export default ResponseTableRow;