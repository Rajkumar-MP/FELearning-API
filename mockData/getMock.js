const aadharInfo = require('./mock/aadhar.json');
const laborActivities = require('./mock/labor-activities.json');
const accountInfo = require('./mock/accountInfo.json');
const login = require('./mock/login.json');


module.exports = {
   ...aadharInfo,
   ...laborActivities,
   ...accountInfo,
   ...login
};