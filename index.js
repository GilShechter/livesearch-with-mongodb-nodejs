const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const router = require('./router');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(router);

app.listen(3000, () => {
    console.log("Application started and Listening on port 3000");
});

