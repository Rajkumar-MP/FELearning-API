'use strict';

const {app, router} = require('./api/server');
const port = process.env.PORT || 3000;
app.use('/',router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});