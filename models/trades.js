module.exports = function(sequelize, DataTypes) {
  var Trade = sequelize.define("Trade", {

    currency: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unit_amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    unit_price_usd: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }); // END TRADE MODEL

  Trade.associate = function (models) {
    Trade.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Trade;

}; // END MODULE.EXPORTS
