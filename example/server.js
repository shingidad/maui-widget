const express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path')
const PROT = process.env.PORT || 4000;
const app = express();
app.use(bodyParser.json());
app.get('/widget.json', function (req, res) {
    res.json({
        "_id": "demo",
        "list": [
            {
                "_id": "iscs.movienet.kr1",
                "appType": "fullpage",
                "group": "video",
                "url": "https://may-widget.herokuapp.com/",
                "x": 0,
                "y": 0,
                "w": 1920,
                "h": 1080,
                "runPattern": "channel",
                "pattern": "",
                "NAME": "Example",
                "CH_NO": "0",
                "major": 0
            }, {
                "_id": "iscs.movienet.kr",
                "appType": "fullpage",
                "group": "video",
                "url": "http://iscs.movienet.kr",
                "x": 0,
                "y": 0,
                "w": 1920,
                "h": 1080,
                "runPattern": "channel",
                "pattern": "",
                "NAME": "MovieNet",
                "CH_NO": "1",
                "major": 1
            }
        ]
    })
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(parseInt(PROT), () => {
    console.log(`run server http://127.0.0.1:${PROT}`);
});