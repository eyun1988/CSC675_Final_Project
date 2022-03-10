/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam,
 *        Edward Yun,
 *        Johnson Nguyen,
 *        Ana Nytochka
 *
 * File: Query.jsx
 *
 * Description: Generates the indivudal cards that is viewed.
 *****************************************************************************/

import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Axios from "axios";

/**
 * Creates the indivdual cards seen in serach results
 * @param api
 * @param response
 * @returns html of cards used to be rendered
 */
function Query({ api, response_cb, title_cb }) {
  const callQuery = async (endpoint) => {
    try {
      Axios.get(endpoint).then((res) => {
        response_cb(res.data.results);
        title_cb(res.data.title);
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="card_container">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{api.split("/").pop()}</Card.Title>
          <Button
            onClick={(e) => {
              callQuery(api);
            }}
          >
            Call Query
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Query;
