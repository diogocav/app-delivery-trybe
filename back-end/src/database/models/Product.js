module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
    'Product',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
      name: DataTypes.STRING(100),
      price: DataTypes.DECIMAL(4,2),
      urlImage:{
        type: DataTypes.STRING(200),
        defaultValue: '',
        allowNull: false
      },
    },
    {
      timestamps: false,
      underscored: true,
    },
  );

  Product.associate = (models) => {
    Product.hasMany(models.SaleProduct,
      { foreignKey: 'productId', as: 'product' });
  };
  
    return Product;
  };