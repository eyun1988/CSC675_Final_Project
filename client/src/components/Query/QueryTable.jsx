/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: QueryTable.jsx
 * 
 * Description: Calls the function to build the table.
 *****************************************************************************/

import React from "react";
import DynamicTable from "../../utility/DynamicTable";
// import Table from "react-bootstrap/Table";

/**
 * Calls builder from DynamicTable.jsx to render data
 * @param data to be built as a table 
 * @returns html to render the table of data
 */
function QueryTable({ data }) {
  return <div>{data.length !== 0 && DynamicTable.Builder(data)}</div>;
}

export default QueryTable;
