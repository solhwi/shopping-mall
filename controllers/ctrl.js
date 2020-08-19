const models = require("./models");

exports.get_login = (req, res) => {
  const key = {
    id: req.session.user_id,
    name: req.session.name
  }
  res.send(key);
};

exports.get_logout = (req, res) => {
  // 로그아웃 처리 - 세션 삭제 후 리다이렉트
  console.log("로그아웃을 시도합니다.");
  req.session.destroy() // 세션 삭제
  res.clearCookie("sid") // 세션에 남은 쿠키 삭제, 부활 방지
  res.redirect('http://localhost:3000');
}

exports.post_login = (req, res) => {
  console.log("로그인을 시도합니다.");
  let isID = false;
  let isPassword = false;
  let count = 0;
  let reqId = req.body.id; //req의 어디에 id가 들어있는가?
  
  //console.log(req.body);가 0이었던 이유는 multer로 받지 않았기 때문이다. formdata는 multer로 받아야함

  models.connection.query(
    "SELECT id, password, name FROM CLIENT WHERE isDeleted = 0",  
    (err, rows, fields) => {
        //console.log(rows);
        for(var i=0; i<rows.length; i++)
        {
          if(reqId === rows[i].id) {
            isID = true;
            count = i;
            break;
          }
        }
        if(isID){
          if(req.body.password === rows[count].password) {
            isPassword = true;
          }}
        if(isPassword) {
          console.log("로그인 성공");
          req.session.user_id = rows[count].id;
          req.session.name = rows[count].name;
          res.send(rows[count]);
        }
        else {
          console.log("로그인 실패");
          res.redirect("http://localhost:3000");
        }
    })

};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ signup */
exports.get_signup = (req, res) => {
  res.render("signup.html");
};
exports.post_signup = (req, res) => {
  let sql = "INSERT INTO CLIENT VALUES (null, ?, ?, ?, now(), 0, 0)";
  let id = req.body.id;
  let password = req.body.password;
  let name = req.body.name;

  let params = [id, password, name];

  models.connection.query(sql, params, (err, rows, fields) => {
    //res.send(rows);
    console.log(err);
  });

  console.log("회원가입에 성공했습니다.");

  res.redirect("http://localhost:3000");
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ main */
exports.get_main = (req, res) => {
  console.log("메인 페이지에 돌입합니다.");

  models.connection.query(
    "SELECT * FROM PRODUCT WHERE isDeleted = 0",
    (err, rows, fields) => {
        res.send(rows);
    })  
};

exports.post_main = (req, res) => {
  let sql = 'INSERT INTO PRODUCT VALUES (null, ?, ?, ?, ?, now(), 0)';
  let image = '/uploads/' + req.file.filename; //multer가 filename을 겹치지 않게 설정
  //body가 비었음 현재
  let productname = req.body.productName;
  let price = req.body.price;
  let context = req.body.context; 
  console.log(req.body);
  let params = [image, productname, price, context];

  models.connection.query(sql, params, 
      (err, rows, fields) => {
          res.send(rows);
          console.log(err);
      }) 
  console.log("상품을 추가합니다.");

};

exports.delete_main = (req, res) => {
  console.log("상품을 삭제합니다.");
  let sql = 'UPDATE PRODUCT SET isDeleted = 1 WHERE id = ?';
  let params = [req.params.id];
  console.log(params);
  console.log(req.body.id);

  models.connection.query(sql, params, 
  (err, rows, fields) => {
      res.send(rows);
  })
};