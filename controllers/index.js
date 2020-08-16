const { Router } = require("express");
const router = Router();
const ctrl = require("./ctrl.js");
const multer = require('multer');
const upload = multer({dest: './uploads'});

// '/main'은 상품의 업로드에 관련된 부분을 처리한다.
router.get("/api/main", ctrl.get_main);
router.post("/api/main", upload.single('image'), ctrl.post_main);
router.delete("/api/main/:id", ctrl.delete_main);

// '/'는 login 여부에 관련된 부분을 처리한다.
router.get("/login", ctrl.get_login);
router.post("/login", ctrl.post_login);

// '/signup;은 회원가입에 관련된 부분을 처리한다.
router.get("/signup", ctrl.get_signup);
router.post('/signup', ctrl.post_signup);

module.exports = router;
