module.exports = (sequelize, DataTypes) => {
    const SaleProduct = sequelize.define(
      'SaleProduct',
      {
        saleId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        productId: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false },
        quantity: DataTypes.INTEGER,
    },
      {
        timestamps: false,
        underscored: true,
        tableName: 'sales_products',
      },
    );

    SaleProduct.associate = (models) => {
        models.Product.belongsToMany(models.Sale, {
          as: 'sales',
          through: SaleProduct,
          foreignKey: 'productId',
          otherKey: 'saleId', 
        });
        models.Sale.belongsToMany(models.Product, {
          as: 'products',
          through: SaleProduct,
          foreignKey: 'saleId',
          otherKey: 'productId',
        });
      };
  
    return SaleProduct;
  };