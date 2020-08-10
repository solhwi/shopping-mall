const app = require("./app");
const port = 3000;
// const express = require('express');
// // const bodyParser= require('body-parser');
// // const app = express();

app.listen(port, function () {
    console.log(port, `번 포트에 실행되었습니다.`);
});
