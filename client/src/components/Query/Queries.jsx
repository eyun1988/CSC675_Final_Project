/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam,
 *        Edward Yun,
 *        Johnson Nguyen,
 *        Ana Nytochka
 *
 * File: Queries.jsx
 *
 * Description: All default queries to be rendered.
 *****************************************************************************/

import React, { useState } from "react";
import Query from "./Query";
import QueryTable from "./QueryTable";

// container for all queries and buttons
/**
 * All default queries to be rendered using query.
 * @returns Query to be generated base on selection.
 */
function Queries() {
  let [results, setResults] = useState([]);
  let [title, setTitle] = useState("");

  const baseURL = "http://localhost:4000";

  // put the list of all the routes in the array.
  // const endpoints = [
  //   "/showAllCustomers",
  //   "/showAllThings",
  //   "/showAllThingsThings",
  // ];

  let endpoints = [];
  for (let i = 0; i <= 10; i++) {
    endpoints.push("/query/" + i);
  }

  return (
    <div>
      <h1>Queries</h1>
      <section>
        <div className="album py-5 bg-light">
          <div className="container-fluid">
            <div className="row">
              {endpoints.map((route) => {
                return (
                  <Query
                    key={route}
                    response_cb={setResults} // _cb are setStates == callbacks
                    api={baseURL + route}
                    title_cb={setTitle}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <h2>{title}</h2>
      <QueryTable data={results} />
    </div>
  );
}

export default Queries;
