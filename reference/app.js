const express = require("express");
const nunjucks = require("nunjucks"); // 템플릿 엔진
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./models");

class App {
  constructor() {
    this.app = express();

    //db 접속
    this.dbConnection();

    // 뷰엔진 셋팅
    this.setViewEngine();

    // 미들웨어 셋팅
    this.setMiddleWare();

    // 정적 디렉토리 추가
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

  dbConnection() {
    // DB authentication
    db.sequelize
      .authenticate()
      .then(() => {
        console.log("DB와 정상적으로 연결되었습니다.");
      })
      .then(() => {
        console.log("DB와 동기화 완료"); // Sync
        // return db.sequelize.sync();
      })
      .catch((err) => {
        console.error("데이터베이스에 연결할 수 없습니다 : ", err);
      });
  }

  setMiddleWare() {
    // 미들웨어 셋팅
    this.app.use(logger("dev"));
    this.app.use(bodyParser.json()); // for parsing application/json
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  setViewEngine() {
    nunjucks.configure("template", {
      autoescape: true, // html 공격, 등을 막는 보안상 역할
      express: this.app,
    });
  }

  setStatic() {
    this.app.use("/uploads", express.static("uploads"));
  }

  setLocals() {
    // 템플릿 변수
    this.app.use((req, res, next) => {
      this.app.locals.isLogin = true; // 로그인이 다 된 상태로 판별
      this.app.locals.req_path = req.path; // 현재 URL을 보내주는 변수
      next();
    });
  }

  getRouting() {
    this.app.use(require("./controllers"));
  }

  status404() {
    this.app.use((req, res, _) => {
      res.status(400).render("common/404.html");
    });
  }

  errorHandler() {
    this.app.use((err, req, res, _) => {
      res.status(500).render("common/500.html");
    });
  }
}

// 파일 호출 시 인스턴스 생성하며 뿌려줌
module.exports = new App().app;
