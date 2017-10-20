import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const PROT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.listen(parseInt(PROT), () => {
    console.log(`run server http://127.0.0.1:${PROT}`);
});