/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: DynamicRow.jsx
 * 
 * Description: Used to generate the rows of data for the tables.
 *****************************************************************************/

import React from "react";
import { Link } from "react-router-dom";
import DeleteUser from "../components/User/DeleteUser";
const DynamicRow = {};

/**
 * The function that renders each piece of data to be
 * displayed in the table.
 * (Current state only implemented for users)
 * @param id query of interest to be rendered
 * @param rows is the row the data is to be inserted at in the table
 * @returns the html to render
 */
DynamicRow.tableRows = (id, rows) => {
  return (
    <tr key={id}>
      <th>{id}</th>
      {rows.map((el) => {
        return <td key={el}>{el}</td>;
      })}
      <td>
        <Link
          to={{
            pathname: `/updateUser/${rows[0]}`,
            state: { user: rows },
          }}
        >
          <button className="btn btn-primary">Update</button>
        </Link>
      </td>
      <td>
        <DeleteUser id={rows[0]} />
      </td>
    </tr>
  );
};

export default DynamicRow;
