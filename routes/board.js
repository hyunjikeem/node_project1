const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const {listenerCount} = require("../schemas/write");
const Write = require("../schemas/write");


router.get("/board", async (req, res) => {
    const write = await Write.find({}).sort("-userId"); //내림차순으로 나타나게 하기
    res.json(write);
});

// 작성하기 부분

router.post('/write', async function (req, res, next) {
    const recentList = await Write.find().sort("-userId").limit(1);
    let userId = 1;
    if (recentList.length !== 0) {
        userId = recentList[0]["userId"] + 1;
    };
    
    const {name, pw, title, desc, date} = req.body;
    console.log(req.body);

    try {
        await Write.create({userId,name,pw,title,desc,date});
    } catch (err) {
        console.log("Error:" + err);
    }
    res.send({result: "success"});
});

// 글 수정

router.get('/modify/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        let write = await Write.findOne({userId});
        res.json(write);
    } catch (err) {
        console.error(err);
    }
});

// 글 작성 내용 부분

router.get('/detail/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        let write = await Write.findOne({userId});
        res.json(write);
    } catch (err) {
        console.error(err);
    }
});

// 글 수정하기 부분

router.post('/modify/:userId', async (req, res) => {
    const {userId, name, title, desc, pw} = req.body;

    let write = await Write.findOne({userId});

    // 비밀번호가 일치하다면
    if (write.pw === pw) {
        await Write.updateOne({userId}, {$set: {name:name, title:title, desc:desc}});
        res.send({result: "success"});
    } else { //비밀번호가 다르다면
        res.send({result: "fail"});
    }
});

// 글 삭제하기

router.delete('/modify/:userId', async (req, res) => {
    const {userId} = req.params;
    const {pw} = req.body;

    let write = await Write.findOne({userId});

    // 비밀번호가 일치하다면 글 삭제
    if (write.pw === pw) {
        await Write.deleteOne({userId});
        res.send({result: "success"});
    } else { //다르다면 실패
        res.send({result: "fail"});
    }
});

module.exports = router;