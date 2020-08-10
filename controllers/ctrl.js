const models = require("./models");

const users = [
  {
    user_id: `godgjwnsgur7`,
    user_pwd: `1111`,
    /* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
  },
];

const findUser = (user_id, user_pwd) => {
  // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
  const check_all = users.find(
    (v) => v.user_id === user_id && v.user_pwd === user_pwd
  );
  return check_all;
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ login - "/" 과 같다 */
exports.get_login = (req, res) => {
  console.log("로그인 페이지에 접근합니다.");
  res.render("login.html");
};
exports.post_login = (req, res) => {
  console.log("로그인을 시도합니다.");
  res.render("main.html");
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

  res.redirect("/");
  // res.send(req.body);
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ main */
exports.get_main = (req, res) => {
  console.log("로그인에 성공하여 메인 페이지에 돌입합니다.");

  res.render("main.html");
};
exports.post_main = (req, res) => {
  if (findUser(req.body.id, req.body.pwd)) {
    res.redirect("/main");
    // res.send(req.body);
  } else {
    res.redirect("/");
  }
};
exports.delete_main = (req, res) => {
  console.log("상품을 삭제합니다.");
};

/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ main_write */
exports.get_main_write = (req, res) => {
  res.redirect("/");
};
exports.post_main_write = (req, res) => {
  res.render("main/write.html");
};
