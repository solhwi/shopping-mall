const users = [
  {
    user_id: `godgjwnsgur7`,
    user_pwd: `1111`,
    /* 보안 키 추가 필요하고 보안 관련된 많은 것들이 필요함. */
  },
];

const findUser = (user_id, user_pwd) => {
  // id와 password가 일치하는 유저를 찾는 함수, 없으면 undefined 반환
  return users.find((v) => v.user_id === user_id && v.user_pwd === user_pwd);
};

exports.get_app = (req, res) => {
  res.render("app.html");
};

exports.get_signup = (req, res) => {
  res.redirect("/");
};

exports.post_signup = (req, res) => {
  res.render("signup.html");
};

exports.get_main = (req, res) => {
  res.redirect("/");
};

exports.post_main = (req, res) => {
  if (findUser(req.body.id, req.body.pwd)) {
    res.render("main.html");
  } else {
    res.redirect("/");
  }
};

exports.get_main_write = (req, res) => {
  res.redirect("/");
};

exports.post_main_write = (req, res) => {
  res.render("main/write.html");
};
