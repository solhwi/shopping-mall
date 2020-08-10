const { Router } = require("express");
const router = Router();
const ctrl = require("./ctrl.js");
// const models = require("../../models");

// '/'는 login 여부에 관련된 부분을 처리한다.
router.get("/", ctrl.get_login);
router.post("/", ctrl.post_login);

// '/signup;은 회원가입에 관련된 부분을 처리한다.
router.get("/signup", ctrl.get_signup);
router.post("/signup", ctrl.post_signup);

// '/main'은 상품의 업로드에 관련된 부분을 처리한다.
router.get("/main", ctrl.get_main);
router.post("/main", ctrl.post_main);
router.delete("/main/:id", ctrl.delete_main);

// '/signup'은 회원의 정보에 관련된 부분을 처리한다.
router.get("/main/write", ctrl.get_main_write);
router.post("/main/write", ctrl.post_main_write);

// 알고싶은 부분 "ctrl." 뒤에 함수 이름 지정해서 컨트롤 + F -> ctrl폴더로

module.exports = router;
