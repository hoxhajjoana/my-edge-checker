import React, { useState } from "react";

function ResponseTable(props){


    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        setActive(!isActive);
    };

    const headers = props.response.headers;

    const table = [<th> Status </th>];


    headers.forEach( header => {
        table.push(<th> {header} </th>)
    });

    const contents = props.response.results;

    const tableContents = [];

    contents.forEach(item => {

        let headerCheckResults = item.headerCheckResults;

        let headerContents = [];

        headerCheckResults.forEach( header => {
            headerContents.push(<td> {header.headerValue}</td>)
        });

        tableContents.push(
            <tr onClick={toggleClass}>
                <td>
                    {item.statusCode}
                </td>
                {headerContents}
            </tr>
        );

        
        const allResponse = [];

        for(let property in item.allResponseHeaders){
            allResponse.push(`${property} : ${item.allResponseHeaders[property]}`);
            allResponse.push(<br/>)
        }


        tableContents.push(
            <tr>
                <td className={isActive?"":"hidden"} colSpan={headerContents.length +1}>{allResponse}</td>
            </tr>
        );


    });

    return(
        <table>
            
            <tr>
                {table}
            </tr>
            {tableContents}

        </table>
    );
}

export default ResponseTable;