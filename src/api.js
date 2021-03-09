const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');



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
    const response = login.find(val => val.username === username && val.password === password);
    if(!!response) {
        return res.json({type: 'SUCCESS', id: response.id});
    } else {
        res.status(500);
        return res.json({type: 'FAILURE'});
    }
});
app.post(`/otp`, (req, res) => {
    const { code = '' } = req.body || {};
    const isValid = code.match(/^(6|7|8)[0-9]{5}$/);
    if(!!isValid) {
        return res.json({type: 'SUCCESS'});
    } else {
        res.status(500);
        return res.json({type: 'FAILURE'});
    }
});
app.post(`/add-payee`, (req, res) => {
    const { payeeDetail, id } = req.body || {};
    const fileName = 'accountInfo.json';
    const selectedAccountIndex = mockJson['accountinfo'].findIndex(val => val.id===id);
    console.log(mockJson['accountinfo'], id, selectedAccountIndex);
    mockJson.accountinfo[selectedAccountIndex].payeeList.push({...payeeDetail});
    fs.writeFile(`./mockData/mock/${fileName}`, JSON.stringify({accountinfo : mockJson.accountinfo}, null, 2), function writeJSON(err) {
        if (err) return res.json({type: 'FAILURE'});
        return res.json({type: 'SUCCESS'});
    });
});
app.post(`/fund-transfer`, (req, res) => {
    const { fromAccountNumber, id, toAccountNumber, amount } = req.body || {};
    const fileName = 'accountInfo.json';

    /** Get Account Index */
    const selectedAccountIndex = mockJson['accountinfo'].findIndex(val => val.id===id);
    /** Get Account Detail Index */
    if(selectedAccountIndex < 0) {
        res.status(500);
        return res.json({type: 'FAILURE', message: 'Invalid Data'});
    } 
    const isValidPayee = !!(mockJson['accountinfo'][selectedAccountIndex].payeeList.find(val => val.accountNo===toAccountNumber));
    const selectedAccountNumber = mockJson['accountinfo'][selectedAccountIndex].accountDetails.find(val => val.accountNo===fromAccountNumber);
    if(isValidPayee && !!selectedAccountNumber && Number(selectedAccountNumber.balance) > Number(amount)) {
        const remainingBalance = Number(selectedAccountNumber.balance) - Number(amount);
        const selectedAccountNumberIndex = mockJson['accountinfo'][selectedAccountIndex].accountDetails.findIndex(val => val.accountNo===fromAccountNumber);
        /** Get Account Index */
        mockJson.accountinfo[selectedAccountIndex].accountDetails[selectedAccountNumberIndex].balance = `${remainingBalance}`;
        fs.writeFile(`./mockData/mock/${fileName}`, JSON.stringify({accountinfo : mockJson.accountinfo}, null, 2), function writeJSON(err) {
            if (err) return res.json({type: 'FAILURE'});
            return res.json({type: 'SUCCESS'});
        });
    } else {
        res.status(500);
        return res.json({type: 'FAILURE', message: 'Invalid Data'})
    }


});


module.exports = app;
