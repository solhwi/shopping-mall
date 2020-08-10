const { Router } = require("express");
const router = Router();

const users = [
  {
    user_id: `godgjwnsgur7`,
    user_pwd: `1111`,
    /* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
  },
];

const findUser = (user_id, user_pwd) => {
  console.log(`findUser values : `, user_id, user_pwd);
  // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
  return users.find((v) => v.user_id === user_id && v.user_pwd === user_pwd);
};

router.get("/", (req, res) => {
  console.log(`URL : "/" get`);
  res.render("login.html");
});

router.post("/", (req, res) => {
  console.log(`URL : "/" get`);
  res.render(req.body);
});

router.get("/main", (req, res) => {
  res.render("main.html");
});

router.post("/main", (req, res) => {
  const body = (req.body.id, req.body.pwd);
  console.log(`post "/main" req.body 값 : `, req.body.id, `, `, req.body.pwd);
  
  if (findUser(req.body.id, req.body.pwd)) {
    console.log(`URL : "/main" post if문`);
    res.send(req.body);
  } else {
    console.log(`URL : "/main" post else문`);
    res.redirect("/");
  }

});

// 회원가입 page에서 submit을 누르면 login 페이지가 호출됩니다. 그에 대한 처리 필요

router.get("/signup", (req, res) => {
  res.render("signup.html");
});

router.post("/signup", (req, res) => {
  res.send(req.body);
});

module.exports = router;
