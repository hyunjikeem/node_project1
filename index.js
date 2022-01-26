const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect ();

const boardRouter = require('./routes/board');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", [boardRouter]);

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('board');
});

app.get('/write', (req, res) => {
    res.render('write');
});

app.get('/detail', (req, res) => {
    res.render('detail');
});

app.get('/modify', (req, res) => {
    res.render('modify');
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});