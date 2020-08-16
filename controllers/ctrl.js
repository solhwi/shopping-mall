const models = require("./models");

exports.get_login = (req, res) => {
  console.log("로그인 페이지에 접근합니다.");
  res.render("login.html");
};

exports.post_login = (req, res) => {
  console.log("로그인을 시도합니다.");
  let isID = false;
  let isPassword = false;
  let count = 0;
  let reqId = req.body.id;

  models.connection.query(
    "SELECT id, password FROM CLIENT WHERE isDeleted = 0",  
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
          res.send(rows[count].id); // 5000/login에게 3000으로 가라고 명령
          res.redirect("http://localhost:3000");
        }

        else {
          console.log("로그인 실패");
          res.redirect("/login");
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

  res.redirect("/login");
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

 // exports.post_logout = (req, res) => {

//   console.log("로그아웃 되었습니다.");

//   let sql = 'UPDATE CLIENT SET isLogin = 0 WHERE id = ?';
//   let reqId = req.body.id; 
//   models.connection.query(sql, reqId, 
//   (err, rows, fields) => {})
  
//   res.redirect("http://localhost:3000"); // 5000/login에게 3000으로 가라고 명령

// }


  // const body = req.body;
  // if (findUser( body.user_id, body.user_pwd ) ) {
  //   // 해당유저가 존재한다면
  //       req.session.user_uid = findUserIndex( body.user_id, body.user_pwd ); //유니크한 값 유저 색인 값 저장
  //       res.redirect("/api/main");
  // } 
  // else {
  //   console.log("로그인 실패")
  //   res.redirect("/login");
  // }

  
  //res.render("main.html");

  // SELECT 필드1, 필드2, 필드3 FROM 테이블명
  // id와 password의 행들을 가져오는 코드
  // 처음에 다 가져온 후 배열에 저장하고 시작할 시 이 곳에 있거나, 새로운 router를 생성해야함
  // models.connection.query(
  //   "SELECT id, password FROM PRODUCT WHERE isDeleted = 0",  
  //   (err, rows, fields) => {
  //       res.send(rows);
  //   })

  // const users = [
//   {
//     user_id: `godgjwnsgur7`,
//     user_pwd: `1111`,
//     /* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
//   },
//   {
//     user_id: `psh50`,
//     user_pwd: `4444`,
//   }
// ];

// const findUser = (user_id, user_pwd) => {
//   // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
//   const check_all = users.find(
//     (v) => v.user_id === user_id && v.user_pwd === user_pwd
//   );
//   return check_all;
// };

// const findUserIndex = (user_id, user_pwd) => {
//   // 일치하는 유저의 index값(유니크) 반환
//   return users.findIndex( v => (v.user_id === user_id && v.user_pwd === user_pwd) );
// }
