const mongoose = require("mongoose");

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/hanghaeblog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        ignoreUndefined: true,
    })
    .catch((err) => {
        console.error(err);
    })
};

mongoose.connection.on("error", (err) => {
    console.error('몽고디비 연결에러', err);
});

module.exports = connect;