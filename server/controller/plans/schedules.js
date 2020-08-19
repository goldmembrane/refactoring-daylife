// const { daily_schedules } = require('../../__test__/database/models');
const { daily_schedules } = require("../../models");

// const jwt = require("jsonwebtoken");

module.exports = {
  get: (req, res) => {
    let date = req.query.date;
    daily_schedules
      .findAll({
        where: {
          date: date,
        },
      })
      .then((data) => {
        res.status(200);
        res.json(data);
        res.end();
      })
      .catch((err) => {
        res.status(501);
      });
  },
  post: (req, res) => {
    let name = req.body.name;
    let date = req.body.date;
    let start = req.body.start;
    let end = req.body.end;

    daily_schedules
      .create({
        name: name,
        start: start,
        end: end,
        date: date,
      })
      .then((data) => {
        res.status(201);
        res.json({ message: "success" });
        res.end();
      })
      .catch((err) => {
        res.status(502);
        res.send(err);
      });
  },
  put: (req, res) => {
    let id = req.query.id;

    let name = req.body.name;
    let date = req.body.date;
    let start = req.body.start;
    let end = req.body.end;

    daily_schedules.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        daily_schedules
          .update(
            {
              name: name,
              date: date,
              start: start,
              end: end,
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

    daily_schedules.findOne({ where: { id: id } }).then((data) => {
      if (data) {
        daily_schedules
          .destroy({ where: { id: id } })
          .then(() => {
            res.status(200);
            res.json({ message: "success" });
            res.end();
          })
          .catch((err) => {
            res.status(501);
          });
      } else {
        res.status(404);
        res.json({ message: "cannot found" });
        res.end();
      }
    });
  },
};
