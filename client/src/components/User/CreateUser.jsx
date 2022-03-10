/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: CreateUser.jsx
 * 
 * Description: Function to create user.
 *****************************************************************************/

import React, { useState } from "react";
// import { Redirect } from "react-router-dom";
import Axios from "axios";

/**
 * Function to request creation of user.
 * @returns render form to create users
 */
function CreateUser() {
  // setters for form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [paymentInfo, setPaymentInfo] = useState(0);
  const [viewingHistory, setViewingHistory] = useState("");
  const [customerList, setNewCustomerList] = useState([]);

  const addCustomer = () => {
    Axios.post("http://localhost:4000/user/addCustomer", {
      first_name: firstName,
      last_name: lastName,
      payment_info: paymentInfo,
      viewing_history: viewingHistory,
    })
      .then((response) => {
        if (response < 0) {
          console.log("user couldn't be made");
        } else {
          setNewCustomerList([
            ...customerList,
            {
              first_name: firstName,
              last_name: lastName,
              payment_info: paymentInfo,
              viewing_history: viewingHistory,
            },
          ]);
        }
        // return <Redirect to="/" />; // still doesn't work
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              // value={firstName}
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter First Name"
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              // value={lastName}
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter Last Name"
              name="last_name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="payment_info">Payment Info</label>
            <input
              // value={paymentInfo}
              type="text"
              className="form-control"
              id="payment_info"
              placeholder="Enter Payment Information"
              name="payment_info"
              onChange={(e) => setPaymentInfo(e.target.value)}
              required
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="viewing_history">Viewing History</label>
            <input
              // value={viewingHistory}
              type="text"
              className="form-control"
              id="viewing_history"
              placeholder="Enter Viewing History"
              name="view_history"
              onChange={(e) => setViewingHistory(e.target.value)}
              required
            />
          </div>
        </div>
        <button type="button" onClick={addCustomer} className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default CreateUser;
