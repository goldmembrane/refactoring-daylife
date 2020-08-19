// const { goals } = require('../../__test__/database/models');
const { goals } = require("../../models");
// const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let category = req.query.category;
    let year = req.query.year;
    let day;
    req.query.day ? (day = req.query.day) : (day = null);

    goals
      .findAll({
        where: {
          category: category,
          year: year,
          day: day,
        },
      })
      .then((data) => {
        res.status(200);
        res.json(data);
        res.end();
      })
      .catch((err) => {
        res.status(404);
        res.json({ message: "not found" });
        res.end();
      });
  },
  post: (req, res) => {
    let category = req.body.category;
    let name = req.body.name;
    let year = req.body.year;
    let day;
    req.body.day ? (day = req.body.day) : (day = null);

    goals
      .create({
        category: category,
        name: name,
        year: year,
        day: day,
      })
      .then((data) => {
        res.status(201);
        res.json({ message: "success" });
        res.end();
      })
      .catch((err) => {
        res.status(502);
        res.send(err);
        res.end();
      });
  },
  put: (req, res) => {
    let id = req.query.id;
    let category = req.body.category;
    let name = req.body.name;
    let year = req.body.year;
    let day;
    req.body.day ? (day = req.body.day) : (day = null);
    let is_done = req.body.is_done;

    goals.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        goals
          .update(
            {
              category: category,
              name: name,
              year: year,
              day: day,
              is_done: is_done,
            },
            { where: { id: id } }
          )
          .then(() => {
            res.status(201);
            res.json({ message: "success" });
            res.end();
          });
      } else {
        res.status(404);
        res.json({ message: "cannot found" });
        res.end();
      }
    });
  },
  delete: (req, res) => {
    let id = req.query.id;

    goals.findOne({ where: { id: userId, id: id } }).then((data) => {
      if (data) {
        // console.log(data);
        goals.destroy({ where: { id: userId, id: id } }).then(() => {
          res.status(200);
          res.json({ message: "success" });
          res.end();
        });
      } else {
        res.status(404);
        res.json({ message: "cannot found" });
        res.end();
      }
    });
  },
};
