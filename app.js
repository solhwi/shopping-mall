const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser");

class App {
  constructor() {
    this.app = express();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 로컬 변수
    this.setLocals();

    // 라우팅
    this.getRouting();
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
  }

  setLocals() {
    // 템플릿 변수
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true; // 무조건 비로그인 상태
      this.app.locals.req_path = req.path;
      next();
    });
  }

  // 라우팅
  getRouting() {
    this.app.use(require("./controllers"));
  }
}

// 파일 호출 시 인스턴스 생성
module.exports = new App().app;
