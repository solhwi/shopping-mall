const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt-nodejs");

class app {
  constructor() {
    this.app = express();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리
    this.setStatic();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();

    // 404 페이지를 찾을수가 없음
    this.status404();

    // 에러처리
    this.errorHandler();
  }

  // 뷰엔진 셋팅
  setViewEngine() {
    // template 폴더를 파일 가져오는 소스로 지정하는 것
    nunjucks.configure("template", {
      autoescape: true,
      express: this.app,
    });
  }

  // 미들웨어 셋팅
  setMiddleWare() {
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cookieParser()); // res에서 cookie() 메서드 호출 가능
    this.app.use(bodyParser.urlencoded({extended: false}));
    this.app.use(session({
        secret: 'ambc@!vsmkv#!&*!#EDNAnsv#!$()_*#@',
        resave: false,
        saveUninitialized: true
    }));
  }

  // 정적 디렉토리
  setStatic() {
    this.app.use("/uploads", express.static("uploads"));
  }

  // 로컬 변수
  setLocals() {
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true;
      this.app.locals.req_path = req.path;
      next();
    });
  }

  // 라우팅
  getRouting() {
    this.app.use(require("./controllers"));
  }

  // 404 페이지를 찾을 수 없음
  status404() {
    this.app.use((req, res, _) => {
      res.status(404).render("common/404.html");
    });
  }

  // 에러처리
  errorHandler() {
    this.app.use((err, req, res, _) => {
      console.log(err);
      res.status(500).render("common/500.html");
    });
  }
}

// 파일 호출 시 인스턴스 생성
module.exports = new app().app;
