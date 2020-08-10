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

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/clients', (req, res) => {
    connection.query(
        "SELECT * FROM CLIENT WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )   
})

app.get('/api/products', (req, res) => {
  connection.query(
      "SELECT * FROM PRODUCT WHERE isDeleted = 0",
      (err, rows, fields) => {
          res.send(rows);
      }
  )   
})

app.use('/image', express.static('./upload'));

app.post('/api/products', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO PRODUCT VALUES (null, ?, ?, ?, now(), 0)';
    let image = '/image/' + req.file.filename; //multer가 filename을 겹치지 않게 설정
    let productname = req.body.productname;
    let price = req.body.price;
    let context = req.body.context;

    let params = [image, productname, price, context];

    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        })
})

app.post('/api/clients', upload.single('image'), (req, res) => {
  let sql = 'INSERT INTO CLIENT VALUES (null, ?, ?, ?, now(), 0)';
  let name = req.body.name;
  let id = req.body.id;
  let password = req.body.password;

  let params = [name, id, password];

  connection.query(sql, params, 
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      })
})


app.delete('/api/clients/:id', (req, res) => {
    let sql = 'UPDATE CLIENT SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];

    connection.query(sql, params, 
    (err, rows, fields) => {
        res.send(rows);
    })

})

app.delete('/api/products/:id', (req, res) => {
  let sql = 'UPDATE PRODUCT SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];

  connection.query(sql, params, 
  (err, rows, fields) => {
      res.send(rows);
  })

})





login.listen(port, function () {
  console.log(port, `번 포트에 실행되었습니다.`);
});
