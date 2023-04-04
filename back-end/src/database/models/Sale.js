module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define(
    'Sale',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      userId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      sellerId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      totalPrice: DataTypes.DECIMAL(9,2),
      deliveryAddress: DataTypes.STRING(100),
      deliveryNumber: DataTypes.STRING(50),
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING(50),
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
        { foreignKey: 'userId', as: 'customerUser' });
    Sale.belongsTo(models.User,
        { foreignKey: 'sellerId', as: 'sellerUser' });
    Sale.hasMany(models.SaleProduct,
        { foreignKey: 'saleId', as: 'sale' });
  };

return Sale;
};