/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: UpdateUser.jsx
 * 
 * Description: Update user function.
 *****************************************************************************/

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";

/**
 * To request update to the user in the database.
 * @returns update user request form
 */
function UpdateUser() {
  // TODO: LOOK UP REDUX REACTJS STATE MANAGEMENT HOOKS API {USEREDUCER}
  // updated list of existing customers and new customers
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPaymentInfo, setNewPaymentInfo] = useState(0);
  const [newViewingHistory, setNewViewingHistory] = useState("");

  const { state } = useLocation();

  const [displayFirstName, setDisplayFirstName] = useState(state.user[1]);
  const [displayLastName, setDisplayLastName] = useState(state.user[2]);
  const [displayPaymentInfo, setDisplayPaymentInfo] = useState(state.user[3]);
  const [displayViewingHistory, setDisplayViewingHistory] = useState(
    state.user[4]
  );

  const updateCustomer = async () => {
    let results = await Axios.put("http://localhost:4000/user/editCustomer", {
      customer_id: state.user[0],
      default_first_name: state.user[1],
      default_last_name: state.user[2],
      default_payment_info: state.user[3],
      default_viewing_history: state.user[4],
      edited_first_name: newFirstName,
      edited_last_name: newLastName,
      edited_payment_info: newPaymentInfo,
      edited_viewing_history: newViewingHistory,
    });
    if (results) {
      await Axios.get("http://localhost:4000/user/getCustomerInfo", {
        params: { customer_id: state.user[0] },
      })
        .then((response) => {
          state.user.first_name = response.data[0].first_name;
          state.user.last_name = response.data[0].last_name;
          state.user.payment_info = response.data[0].payment_info;
          state.user.viewing_history = response.data[0].viewing_history;
          setDisplayFirstName(state.user.first_name);
          setDisplayLastName(state.user.last_name);
          setDisplayPaymentInfo(state.user.payment_info);
          setDisplayViewingHistory(state.user.viewing_history);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <table className="table table-striped table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">
              <strong>{state.user[0]} </strong>
            </th>
            <th scope="col">
              <strong>{displayFirstName} </strong>
            </th>
            <th scope="col">
              <strong>{displayLastName} </strong>
            </th>
            <th scope="col">
              <strong>{displayPaymentInfo} </strong>
            </th>
            <th scope="col">
              <strong>{displayViewingHistory} </strong>{" "}
            </th>
          </tr>
        </thead>
      </table>
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="first_name">First Name</label>
            <input
              // value={firstName}
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Edit First Name"
              name="first_name"
              onChange={(e) => setNewFirstName(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="last_name">Last Name</label>
            <input
              // value={lastName}
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Edit Last Name"
              name="last_name"
              onChange={(e) => setNewLastName(e.target.value)}
            />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="payment_info">Payment Info</label>
            <input
              // value={paymentInfo}
              type="text"
              className="form-control"
              id="payment_info"
              placeholder="Edit Payment Information"
              name="payment_info"
              onChange={(e) => setNewPaymentInfo(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="viewing_history">Viewing History</label>
            <input
              // value={viewingHistory}
              type="text"
              className="form-control"
              id="viewing_history"
              placeholder="Edit Viewing History"
              name="view_history"
              onChange={(e) => setNewViewingHistory(e.target.value)}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={updateCustomer}
          className="btn btn-primary"
        >
          Update Customer
        </button>
      </form>
    </div>
  );
}

export default UpdateUser;
