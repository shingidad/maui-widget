const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path')
const PROT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(parseInt(PROT), () => {
    console.log(`run server http://127.0.0.1:${PROT}`);
});