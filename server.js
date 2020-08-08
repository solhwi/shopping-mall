const login = require("./app.js");
const port = 3000;
const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.json());
// api는 json의 형식으로 데이터를 전송함
app.use(bodyParser.urlencoded({extended: true}));

const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: conf.host, //database.json에 적힌 host
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect();

login.listen(port, function () {
  console.log(port, `번 포트에 실행되었습니다.`);
});
