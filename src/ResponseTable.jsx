import React from "react";
import ResponseTableRow from "./ResponseTableRow";

function ResponseTable(props){

    const headers = props.response.headers;

    let i=0;

    const strings = props.response.searchStrings;

    const tableHeaders = [<><th key={i++}>  </th> <th key={i++}> Status </th> {strings?<th key={i++}>String Search - {strings[0]}</th>:""}</>];

    headers.forEach( (header, index) => {
        tableHeaders.push(<th key={index+i}> {header} </th>)
    });

    const contents = props.response.results;

    const tableContents = [];


    contents.forEach((item, index) => {
        
        tableContents.push(<ResponseTableRow responseHeaders={props.response.responseHeaders} key={index+i} results={item}/>)

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