import React from "react";
import ResponseTableRow from "./ResponseTableRow";

function ResponseTable(props){


    const headers = props.response.headers;

    const tableHeaders = [<th key={0}> Status </th>];

    headers.forEach( (header, index) => {
        tableHeaders.push(<th key={index+1}> {header} </th>)
    });

    const contents = props.response.results;

    const tableContents = [];

    contents.forEach((item, index) => {
        
        tableContents.push(<ResponseTableRow key={index} results={item}/>)

    });

    return(
        <table>
            <thead>
                <tr>
                    {tableHeaders}
                </tr>
            </thead>
            <tbody>
                {tableContents}
            </tbody>
        </table>
    );
}

export default ResponseTable;