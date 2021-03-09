const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');

const bodyParser = require('body-parser');

const mockJson = require('../mockData/getMock');

const getSpecificData = (obj, id) => obj.find(val => val.id === id) || {};

app.use(bodyParser.json());
app.use(cors());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get("/aadhar/:id", (req, res) => { res.json(getSpecificData(mockJson['aadhar'], req.params.id)); });
app.get("/accountinfo/:id", (req, res) => { res.json(getSpecificData(mockJson['accountinfo'], req.params.id)); });
app.get(`/laboral-activities`, (req, res) => res.json({ route: mockJson['laboral-activities'] }));
app.get(`/expected-turnover`, (req, res) => res.json({ route: mockJson['expected-turnover'] }));
app.post(`/login`, (req, res) => {
    const { username, password } = req.body || {};
    const  { login } = mockJson;
    const response = login.find(val => val.username === username && val.password === password) || {};
    return res.json(response);

});
app.post(`/otp`, (req, res) => {
    const { otpCode } = req.body || {};
    const isValid = otpCode.match(/^(6|7|8)[0-9]{5}$/);
    return res.json({isOTPValid : isValid});
});


module.exports = app;
