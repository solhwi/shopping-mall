const { Router } = require("express");
const router = Router();
const db = require("./db");

const users = [
  {
    user_id: `godgjwnsgur7`,
    user_pwd: `1111`,
    /* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
  },
];

// '/'는 login 여부에 관련된 부분을 처리한다.
// '/main'은 상품의 업로드에 관련된 부분을 처리한다.
// '/signup'은 회원의 정보에 관련된 부분을 처리한다.

const findUser = (user_id, user_pwd) => {
  console.log(`findUser values : `, user_id, user_pwd);
  // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
  return users.find((v) => v.user_id === user_id && v.user_pwd === user_pwd);
};



// '/'는 login 여부에 관련된 부분을 처리한다.
router.get("/", (req, res) => {
  console.log("로그인 페이지에 접근합니다.");
  res.render("login.html");
});

router.post("/login", (req, res) => {
  console.log("로그인을 시도합니다.");
  res.render(req.body);
});


// '/main'은 상품의 업로드에 관련된 부분을 처리한다.
router.get("/main", (req, res) => {
  console.log("로그인에 성공하여 메인 페이지에 돌입합니다.");
  
  //res.render("main.html");
});

router.post("/main", (req, res) => {

  console.log("상품을 추가하거나 삭제합니다.");

  // const body = (req.body.id, req.body.pwd);
  // console.log(`post "/main" req.body 값 : `, req.body.id, `, `, req.body.pwd);
  
  // if (findUser(req.body.id, req.body.pwd)) {
  //   console.log(`URL : "/main" post if문`);
  //   res.send(req.body);
  // } else {
  //   console.log(`URL : "/main" post else문`);
  //   res.redirect("/");
  // }
});


router.delete("/main/:id", (req, res) => {

  console.log("상품을 삭제합니다.");

})


// '/signup'은 회원의 정보에 관련된 부분을 처리한다.
router.get("/signup", (req, res) => {
  console.log("회원가입 페이지에 접근합니다.");
  res.render("signup.html");
});

router.post("/signup", (req, res) => {

    let sql = 'INSERT INTO CLIENT VALUES (null, ?, ?, ?, now(), 0)';

    let id = req.body.id;
    let password = req.body.password;
    let name = req.body.name;

    let params = [id, password, name];

    db.connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        })
    
    console.log("회원가입에 성공했습니다.");

 
  // res.send(req.body);
});

// router2.use('/*', router3), use는 미들웨어에서 많이 씀, 에외처리 시 /*을 많이 씀

module.exports = router;
