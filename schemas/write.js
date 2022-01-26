const mongoose = require("mongoose");

const { Schema } = mongoose;

//아이디, 작성자명, 비밀번호, 제목, 내용, 날짜

const writeSchema = new Schema ({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    pw: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },

    desc: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("Write", writeSchema);