
'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

const mockJson = require('./getMock');

const getSpecificData = (obj, id) => obj.find(val => val.id === id) || {};

router.get("/aadhar/:id", (req, res) => { res.send(getSpecificData(mockJson['aadhar'], req.params.id)); });
router.get(`/laboral-activities`, (req, res) => res.json({ route: mockJson['laboral-activities'] }));
router.get(`/expected-turnover`, (req, res) => res.json({ route: mockJson['expected-turnover'] }));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);

module.exports = {app, router};
module.exports.handler = serverless(app);