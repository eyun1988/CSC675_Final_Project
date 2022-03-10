/******************************************************************************
 * Class: CSC 0675-01 Introduction to Database Systems Fall 2021
 * Name:  Justin Lam,
 *        Edward Yun,
 *        Johnson Nguyen,
 *        Ana Nytochka
 *
 * File: index.js
 *
 * Description: index js file is the primary file that deals with routing
 *              models and middleware accessed by the landing page.
 *****************************************************************************/

const express = require("express");
const router = express.Router();
const db = require("../conf/db");

// Home page routes
const queries = [
  // query 0
  `select * from customers;`,
  // query 1
  `select m.title from medias m, medias_actors ma1
      where m.media_id = ma1.medias_media_id and EXISTS (
          select * from actors a, medias_actors ma2
              where ma1.medias_actors_id = ma2.medias_actors_id 
              and a.actor_id = ma2.actors_actor_id 
              and a.position = "Lead"
              and a.first_name LIKE 'K%');`,
  // query 2
  `select m.title from medias m, medias_directors md1
      where m.media_id = md1.medias_media_id and exists (
          select * from directors d, medias_directors md2
              where md1.medias_directors_id = md2.medias_directors_id
              and d.director_id = md2.directors_director_id
              and d.last_name like 'S%');`,
  // query 3
  `select a.first_name, a.last_name from actors a, medias_actors ma, companies_medias cm
      where cm.medias_media_id = ma.medias_media_id
      and ma.actors_actor_id = a.actor_id
      and a.actor_id not in (
          select ma2.actors_actor_id
              from companies c, medias_actors ma2, companies_medias cm2
              where ma2.medias_media_id = cm2.medias_media_id
              and c.company_id = cm2.companies_company_id
              and c.name <> "netflix");`,
  // query 4
  `select distinct c.name from companies_medias cm, medias m, companies c 
      where cm.medias_media_id = m.media_id
      and m.budget < (select avg(m1.budget) 
              from medias m1, companies_medias cm1
              where cm.medias_media_id = cm1.medias_media_id);`,
  // query 5
  `select distinct m.title from companies_medias cm, medias m 
        where cm.medias_media_id = m.media_id
        and m.budget < (select avg(m1.budget) 
                        from medias m1, companies_medias cm1
                        where cm.medias_media_id = cm1.medias_media_id);`,
  // query 6
  `select distinct a.first_name, a.last_name from actors a
        WHERE NOT EXISTS (
        select * from companies c, companies_medias cm, medias_actors ma 
            where cm.medias_media_id = ma.medias_media_id and c.company_id = cm.companies_company_id and ma.actors_actor_id = a.actor_id
            and c.name LIKE "Hulu");`,
  // query 7
  `select a.actor_id, a.first_name, a.last_name, a.pay, COUNT(m.medias_media_id) as roles
        from actors a 
        left join medias_actors m 
        on a.actor_id = m.actors_actor_id 
        group by m.actors_actor_id, a.actor_id
        having COUNT(m.medias_media_id) > 1`,
  // query 8
  `SELECT ALL a.first_name, a.last_name, a.pay FROM actors a
  WHERE a.pay > '29000000';`,
  // query 9
  `select c.customer_id, c.first_name, c.last_name, COUNT(m.medias_media_id) as medias 
        from customers c 
        left join customers_medias m  
        on c.customer_id = m.customers_customer_id  
        group by m.customers_customer_id, c.customer_id
        having COUNT(m.medias_media_id) > 1;`,
  // query 10
  `SELECT a.first_name, a.last_name, a.pay, a.roles FROM actor_info a
  HAVING a.roles > 2 AND a.pay > 15000000;`,
];

// TODO: change comment and asana for 8, and 10 to match the query
/**
 * 1.Title of media whose Lead actors name start with a K.
 * 2.Title media whose directors name only start with S.
 * 3.Names of actors who work for Netflix and nowhere else.
 * 4.Names of companies who media budget less than the average media budget.
 * 5.Names of media who media's budget less than the average media budget.
 * 6.Names of all actors who have not acted for the company Hulu.
 * 7.Names of actors who have acted in at least 2 medias
 * 8.Medias who has at least X of actors whose pay is higher than Y
 * 9.Names of users who have two or more companies.
 * 10.Names of actors with the higher gross income $X than all actors that are not at least 2 medias (or companies)?
 */
const titles = [
  "",
  "Title of media whose Lead actors name start with a K.",
  "Title media whose directors name only start with S.",
  "Names of actors who work for Netflix and nowhere else.",
  "Names of companies who media budget less than the average media budget.",
  "Names of media who media's budget less than the average media budget.",
  "Names of all actors who have not acted for the company Hulu.",
  "Names of actors who have acted in at least 2 medias",
  "Medias who has at least X of actors whose pay is higher than Y",
  "Names of users who have two or more companies.",
  "Names of actors with the higher gross income $X than all actors that are not at least 2 medias (or companies)?",
];

/**
 * General purpose route that will take a integer that will be used to select the index
 * of the queries array with its cooresponding index.
 */
router.get("/query/:number(\\d+)", async (req, res) => {
  let number = req.params.number;
  let baseSQL = queries[number]; // 1 - 10
  let title = titles[number];
  try {
    let [results, field] = await db.execute(baseSQL, []);
    if (results && results.length) {
      res.send({ title: title, results: results });
    }
  } catch (err) {
    console.log(err);
  }
});

/**
 * The route executes a sql querry that sends all the user information
 * from the database.
 */
// router.get("/showAllCustomers", async (req, res) => {
//   try {
//     let baseSQL = "SELECT * FROM customers;";
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       res.send({ results: results });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

/**
 * Temporay function... needs to be replaced with an actually query
 * or deleted.
 */
// router.get("/query2", async (req, res) => {
//   try {
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query3", async (req, res) => {
//   try {
//     let baseSQL = `select a.first_name, a.last_name from actors a, medias_actors ma, companies_medias cm
//           where cm.medias_media_id = ma.medias_media_id
//           and ma.actors_actor_id = a.actor_id
//           and a.actor_id not in (
//               select ma2.actors_actor_id
//               from companies c, medias_actors ma2, companies_medias cm2
//               where ma2.medias_media_id = cm2.medias_media_id
//               and c.company_id = cm2.companies_company_id
//               and c.name <> "netflix");`;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query4", async (req, res) => {
//   try {
//     let baseSQL = `select distinct c.name from companies_medias cm, medias m, companies c
//         where cm.medias_media_id = m.media_id
//         and m.budget < (select avg(m1.budget)
//                 from medias m1, companies_medias cm1
//                 where cm.medias_media_id = cm1.medias_media_id);`;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query5", async (req, res) => {
//   try {
//     let baseSQL = `select distinct m.title from companies_medias cm, medias m
//         where cm.medias_media_id = m.media_id
//         and m.budget < (select avg(m1.budget)
//                         from medias m1, companies_medias cm1
//                         where cm.medias_media_id = cm1.medias_media_id);`;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query6", async (req, res) => {
//   try {
//     let baseSQL = `select distinct a.first_name, a.last_name from actors a
//         WHERE NOT EXISTS (
//         select * from companies c, companies_medias cm, medias_actors ma
//             where cm.medias_media_id = ma.medias_media_id and c.company_id = cm.companies_company_id and ma.actors_actor_id = a.actor_id
//             and c.name LIKE "Hulu"
//         );`;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query7", async (req, res) => {
//   try {
//     let baseSQL = ``;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query8", async (req, res) => {
//   try {
//     let baseSQL = ``;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query9", async (req, res) => {
//   try {
//     let baseSQL = ``;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/query10", async (req, res) => {
//   try {
//     let baseSQL = ``;
//     let [results, field] = await db.execute(baseSQL, []);
//     if (results && results.length) {
//       //   console.log(results);
//       res.send({ results: results, field: field });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
