module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {

    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }

  }); // END USER MODEL

  User.associate = function(models) {
    User.hasMany(models.Trade, {
      onDelete: "cascade"
    });
  };

  return User;

}; // END MODULE.EXPORTS
