module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
      productName: {
          type: DataTypes.STRING,
          allowNull: false
      },
      quantity: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      totalPrice: {
          type: DataTypes.FLOAT,
          allowNull: false
      }
  });

  return Cart;
};