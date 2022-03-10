/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam, 
 *        Edward Yun, 
 *        Johnson Nguyen, 
 *        Ana Nytochka
 * 
 * File: Home.jsx
 * 
 * Description: renders the table queries as results.
 *****************************************************************************/

// import React, { useState } from "react";
import React from "react";
// import { Link } from "react-router-dom";
// import Query from "./Query/Query";
import Queries from "./Query/Queries";
// import axios from "axios";

/**
 * Render the dynamic table
 * @returns queries as html
 */
function Home() {
  return (
    <div>
      <Queries />
    </div>
  );
}
export default Home;
