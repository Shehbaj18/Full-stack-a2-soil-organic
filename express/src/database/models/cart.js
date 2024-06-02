module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define("cart", {
    cart_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: "carts",
    timestamps: true
  });

  return Cart;
};
