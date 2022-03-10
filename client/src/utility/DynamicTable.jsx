/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: DynamicTable.jsx
 * 
 * Description: Handles generation of the tables
 *****************************************************************************/

import Table from "react-bootstrap/Table";
import DynamicRow from "./DynamicRow";
const DynamicTable = {};

/**
 * Renders the table header (first column)
 * @param headers the name of the columns
 * @returns the html needed to render
 */
DynamicTable.tableHead = (headers) => {
  return (
    <thead>
      <tr>
        <th>#</th>
        {headers.map((columnHeader) => {
          return <th key={columnHeader}>{columnHeader}</th>;
        })}
        <th>Update</th>
        <th>Delete</th>
      </tr>
    </thead>
  );
};

/**
 * Original function to display querries
 * @ param id the id of the content
 * @ param rows what row to insert into
 * @ returns html to render
 */
// DynamicTable.tableRows = (id, rows) => {
//   return (
//     <tr key={id}>
//       <th>{id}</th>
//       {rows.map((el) => {
//         return <td key={el}>{el}</td>;
//       })}
//     </tr>
//   );
// };

/**
 * Renders the data as rows for the table.
 * @param data content to render in row form
 * @returns html to render
 */
DynamicTable.tableData = (data) => {
  return (
    <tbody key={data.length}>
      {data.map((row, index) => {
        return DynamicRow.tableRows(index, Object.values(row));
      })}
    </tbody>
  );
};

/**
 * Initial function to build the table
 * @param data content to render 
 * @returns the table as html
 */
DynamicTable.Builder = (data) => {
  let keys = Object.keys(data[0]);
  let headers = DynamicTable.tableHead(keys);
  let rows = DynamicTable.tableData(data);
  return (
    <Table responsive striped bordered hover>
      {headers}
      {rows}
    </Table>
  );
};

export default DynamicTable;
