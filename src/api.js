const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

const mockJson = require('../mockData/getMock');

const getSpecificData = (obj, id) => obj.find(val => val.id === id) || {};


router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

router.get("/hello", (req, res) => {
  res.json({
    hello: "hello Url!"
  });
});

router.get("/aadhar/:id", (req, res) => { res.json(getSpecificData(mockJson['aadhar'], req.params.id)); });
router.get(`/laboral-activities`, (req, res) => res.json({ route: mockJson['laboral-activities'] }));
router.get(`/expected-turnover`, (req, res) => res.json({ route: mockJson['expected-turnover'] }));



app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
