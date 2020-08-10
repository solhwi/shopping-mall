const moment = require("moment");

module.exports = function (sequelize, DataTypes) {
  const Products = sequelize.define("Products", {
    // autoIncrement -> 1씩 증가해서 ID 생성
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT },
  });

  // prototype으로 dateFormat라는 함수를 추가
  Products.prototype.dateFormat = (date) =>
    moment(date).format("YYYY년 MM월 DD일");
  // 원하는 형식에 맞춰서 가능

  return Products;
};
