const models = require("./models");

/* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
const users = [
  {
    user_id: `godgjwnsgur7`,
    user_pwd: `1111`,
  },
  {
    user_id: `psh50`,
    user_pwd: `4444`,
  },
];

const findUser = (user_id, user_pwd) => {
  // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
  const check_all = users.find(
    (v) => v.user_id === user_id && v.user_pwd === user_pwd
  );
  return check_all;
};

const findUserIndex = (user_id, user_pwd) => {
  // 일치하는 유저의 index값(유니크) 반환
  return users.findIndex(
    (v) => v.user_id === user_id && v.user_pwd === user_pwd
  );
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ login - "/" 과 같다 */
exports.get_login = (req, res) => {
  console.log("로그인 페이지에 접근합니다.");
  res.render("login.html");
};
exports.post_login = (req, res) => {
  console.log("로그인을 시도합니다.");

  if (findUser(req.body.id, req.body.pwd)) {
    res.redirect("/api/main");
  } else {
    res.redirect("/login");
  }
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ signup */
exports.get_signup = (req, res) => {
  res.render("signup.html");
};
exports.post_signup = (req, res) => {
  let sql = "INSERT INTO CLIENT VALUES (null, ?, ?, ?, now(), 0)";
  let id = req.body.id;
  let password = req.body.password;
  let name = req.body.name;

  let params = [id, password, name];

  models.connection.query(sql, params, (err, rows, fields) => {
    //res.send(rows);
    console.log(err);
  });

  console.log("회원가입에 성공했습니다.");

  res.redirect("/login");
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ main */
exports.get_main = (req, res) => {
  console.log("로그인에 성공하여 메인 페이지에 돌입합니다.");

  //res.render("main.html");

  models.connection.query(
    "SELECT * FROM PRODUCT WHERE isDeleted = 0",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
};

exports.post_main = (req, res) => {
  let sql = "INSERT INTO PRODUCT VALUES (null, ?, ?, ?, ?, now(), 0)";
  let image = "/uploads/" + req.file.filename; //multer가 filename을 겹치지 않게 설정
  //body가 비었음 현재
  let productname = req.body.productName;
  let price = req.body.price;
  let context = req.body.context;
  console.log(req.body);
  let params = [image, productname, price, context];

  models.connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
    console.log(err);
  });

  console.log("상품을 추가합니다.");
};

exports.delete_main = (req, res) => {
  console.log("상품을 삭제합니다.");
  let sql = "UPDATE PRODUCT SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  console.log(params);
  console.log(req.body.id);

  models.connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ main_write */
exports.get_main_write = (req, res) => {
  res.redirect("/login");
};
exports.post_main_write = (req, res) => {
  res.render("main/write.html");
};
