import React from "react";
import HeaderTable from "./HeaderTable";

function RequestTable(props){

    return(

        <table>
            <tbody>
                <tr>
                    <th>URL</th>
                    <td>{props.url}</td>
                </tr>
                {props.searchString ? <tr><th>Search String</th><td>{props.searchString}</td></tr> : ""}
                {Object.keys(props.requestHeaders).length !==0 ? <HeaderTable headers={props.requestHeaders} table="Request Hearders"/> : ""}
                {Object.keys(props.responseHeaders).length !==0  ? <HeaderTable headers={props.responseHeaders} table="Response Headers"/> : ""}
                {Object.keys(props.errorMessages).length !==0  ? <HeaderTable headers={props.errorMessages} table="Error Messages"/> : ""}

            </tbody>
        </table>
    );
}

export default RequestTable;