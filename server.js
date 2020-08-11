const app = require("./app");
//const port = 5000;
const port = process.env.PORT || 5000;

// const express = require('express');
// // const bodyParser= require('body-parser');
// // const app = express();

// app.listen(port, function () {
//     console.log(port, `번 포트에 실행되었습니다.`);

app.listen(port, () => console.log(`Server Port: ${port}`));

