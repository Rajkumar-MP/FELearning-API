'use strict';

const {app, router} = require('./api/server');
const port = 3000;
app.use('/',router);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});