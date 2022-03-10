/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: DeleteUser.jsx
 * 
 * Description: Function to delete user.
 *****************************************************************************/

import React from "react";
import axios from "axios";

/**
 * Function to request deletion of user.
 * (Current state incomplete, doesn't delete row in
 *  frontend as of now, unless page is refreshed)
 * @param id the user to be deleted
 * @returns form for deletion
 */
function DeleteUser({ id }) {
  const deleteCustomer = (id) => {
    axios.delete(`http://localhost:4000/user/deleteCustomer/${id}`);
  };

  return (
    <button className="btn btn-danger" onClick={() => deleteCustomer(id)}>
      Delete
    </button>
  );
}

export default DeleteUser;
