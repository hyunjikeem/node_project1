const express = require("express");
const res = require("express/lib/response");
const router = express.Router();
const {listenerCount} = require("../schemas/write");
const Write = require("../schemas/write");


router.get("/board", async (req, res) => {
    const write = await Write.find({}).sort("-userId");
    res.json(write);
});

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

router.get('/modify/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        let write = await Write.findOne({userId});
        res.json(write);
    } catch (err) {
        console.error(err);
    }
});

router.get('/detail/:userId', async (req, res) => {
    try {
        const {userId} = req.params;
        let write = await Write.findOne({userId});
        res.json(write);
    } catch (err) {
        console.error(err);
    }
});

router.post('/modify/:userId', async (req, res) => {
    const {userId, name, title, desc, pw} = req.body;

    let write = await Write.findOne({userId});

    if (write.pw === pw) {
        await Write.updateOne({userId}, {$set: {name:name, title:title, desc:desc}});
        res.send({result: "success"});
    } else {
        res.send({result: "fail"});
    }
});

router.delete('/modify/:userId', async (req, res) => {
    const {userId} = req.params;
    const {pw} = req.body;

    let write = await Write.findOne({userId});

    if (write.pw === pw) {
        await Write.deleteOne({userId});
        res.send({result: "success"});
    } else {
        res.send({result: "fail"});
    }
});

module.exports = router;