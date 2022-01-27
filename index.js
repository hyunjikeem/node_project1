const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect ();

const boardRouter = require('./routes/board');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/api", [boardRouter]);

// ejs 템플릿 엔진 사용하기 위한 app.set
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

//메인페이지
app.get('/', (req, res) => {
    res.render('board');
});

// 글쓰기 페이지
app.get('/write', (req, res) => {
    res.render('write');
});

// 글 내용이 나오는 detail 페이지
app.get('/detail', (req, res) => {
    res.render('detail');
});

// 글 수정 페이지
app.get('/modify', (req, res) => {
    res.render('modify');
});

// listen 함수를 이용해서 포트 연결
app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});