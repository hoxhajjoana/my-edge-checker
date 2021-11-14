import React, { useState } from "react";

function ResponseTableRow(props){

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    const headerCheckResults = props.results.headerCheckResults;

    const headerContents = [];

    headerCheckResults.forEach( (header, index) => {
        headerContents.push(<td key={index}> {header.headerValue}</td>)
    });

    
    const allResponse = [];

    let index=0;

    for(let property in props.results.allResponseHeaders){
        allResponse.push(`${property} : ${props.results.allResponseHeaders[property]} `);
        allResponse.push(<br key={index}/>)
        index+=1;
    }

    return(
        <>
        <tr onClick={toggleClass} className="chosenHeaders">
            <td>
                {props.results.statusCode}
            </td>
            {headerContents}
        </tr>
        <tr className="left">
            <td className={isActive?"":"hidden"} colSpan={headerContents.length +1}>{allResponse}</td>
        </tr>
        </>
    );

}

export default ResponseTableRow;