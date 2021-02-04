const aadharInfo = require('./mock/aadhar.json');
const laborActivities = require('./mock/labor-activities.json');


module.exports = {
   ...aadharInfo,
   ...laborActivities 
};