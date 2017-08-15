module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    // burger_name: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // },
    // devoured: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: false
    // }

  });

  return User;

  var Trade = sequelize.define("Trade", {




  });

  return Trade;
};
