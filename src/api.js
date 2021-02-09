const express = require("express");
const app = express();
const path = require('path');

const mockJson = require('../mockData/getMock');

const getSpecificData = (obj, id) => obj.find(val => val.id === id) || {};

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/aadhar/:id", (req, res) => { res.json(getSpecificData(mockJson['aadhar'], req.params.id)); });
app.get(`/laboral-activities`, (req, res) => res.json({ route: mockJson['laboral-activities'] }));
app.get(`/expected-turnover`, (req, res) => res.json({ route: mockJson['expected-turnover'] }));

module.exports = app;
