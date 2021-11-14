import React from "react";
import HeaderTable from "./HeaderTable";

function RequestTable(props){

    const string = props.searchString?<tr>
    <th>Search String</th>
        <td>{props.searchString}</td>
    </tr>:"";
    const error = props.errorMessages?<tr>
    <th>Error Messages</th>
        <td>{props.errorMessages}</td>
    </tr>:"";

    return(

        <table>
            <tbody>
                <tr>
                    <th>URL</th>
                    <td>{props.url}</td>
                </tr>
                {string}
                <HeaderTable headers={props.requestHeaders} table="Request"/>
                <HeaderTable headers={props.responseHeaders} table="Response"/>
                {error}

            </tbody>
        </table>
    );
}

export default RequestTable;