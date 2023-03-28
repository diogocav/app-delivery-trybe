module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.createTable('sales', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      sellerId: {
        allowNull: false, 
        type: Sequelize.INTEGER, 
        field: 'seller_id', 
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
        references: { 
          model: 'users',
          key: 'id' 
        } 
      },
      totalPrice: { allowNull: false, type: Sequelize.STRING, field: 'total_price' },
      deliveryAddress: { allowNull: false, type: Sequelize.STRING, field: 'delivery_address' },
      deliveryNumber: { allowNull: false, type: Sequelize.STRING, field: 'delivery_number' },
      saleDate: { allowNull: false, type: Sequelize.STRING, field: 'sale_date' },
    }),

  down: async (queryInterface, _Sequelize) => queryInterface.dropTable('sales'),
};
