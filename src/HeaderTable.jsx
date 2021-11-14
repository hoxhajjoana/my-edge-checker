import React from "react";

function HeaderTable(props){

    const rows = [];

    Object.keys(props.headers).forEach((key) => {

        rows.push(<tr key={key}>
            <td>{key}</td>
            <td>{props.headers[key]}</td>
        </tr>);

    });

    return(

        <>
        <tr>
            <th colSpan={2}>{props.table} Headers
            </th>
        </tr>
        {rows}        
        </>

    );
}

export default HeaderTable;