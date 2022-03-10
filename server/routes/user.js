/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: user.js
 * 
 * Description: user js file is a combination of what would consist
 *              of the model, middleware, and routes for users that
 *              allows for the communcation of the frontend and
 *              backend.
 *****************************************************************************/

const express = require("express");
const router = express.Router();
const db = require("../conf/db");

/**
 * The route accepts the neccesary content from the frontend to
 * construct the sql query to inser the customers information.
 */
router.post("/addCustomer", async (req, res) => {
  try {
    const { first_name, last_name, payment_info, viewing_history } = req.body;
    let baseSQL =
      "INSERT INTO customers (first_name, last_name, payment_info, viewing_history) VALUES (?, ?, ?, ?);";
    let [results, fields] = await db.execute(baseSQL, [
      first_name,
      last_name,
      payment_info,
      viewing_history,
    ]);
    if (results) {
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * The routes accepts the neccesary information from the frontend
 * and checks for changes in the desired field of the user that 
 * is targerted to be edit. Once fields are identified to be edited
 * it constructs the sql query to update the database.
 */
router.put("/editCustomer", async (req, res) => {
  // remove default values and figure out a way
  try {
    let {
      customer_id,
      default_first_name,
      default_last_name,
      default_payment_info,
      default_viewing_history,
      edited_first_name,
      edited_last_name,
      edited_payment_info,
      edited_viewing_history,
    } = req.body;
    // if empty set to default
    if (!edited_first_name) {
      edited_first_name = default_first_name;
    }
    if (!edited_last_name) {
      edited_last_name = default_last_name;
    }
    if (!edited_payment_info) {
      edited_payment_info = default_payment_info;
    }
    if (!edited_viewing_history) {
      edited_viewing_history = default_viewing_history;
    }
    let baseSQL =
      "UPDATE customers SET first_name = ?, last_name = ?, payment_info = ?, viewing_history = ? WHERE customer_id = ?;";
    let results = await db.execute(baseSQL, [
      edited_first_name,
      edited_last_name,
      edited_payment_info,
      edited_viewing_history,
      customer_id,
    ]);
    if (results) res.send(customer_id.toString());
  } catch (err) {
    console.log(err);
  }
});

/**
 * Route request from the frontend that sends the user id to 
 * construct a sql query that retreives the users information.
 */
router.get("/getCustomerInfo", async (req, res) => {
  const customer_id = req.query.customer_id;
  try {
    let baseSQL = "SELECT * FROM customers where customer_id = ?;";
    let [results, fields] = await db.execute(baseSQL, [customer_id]);
    if (results) res.send(results);
  } catch (err) {
    console.log(err);
  }
});

/**
 * Route request from the frontend that sends the user id to
 * construct a sql query that deletes the user.
 */
router.delete("/deleteCustomer/:id", async (req, res) => {
  const customer_id = req.params.id;
  try {
    let baseSQL = "DELETE FROM customers WHERE customer_id = ?;";
    db.execute(baseSQL, [customer_id]).then((response) => res.send(response));
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
