module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, allowNull: false, autoIncrement: true },
      name: DataTypes.STRING(100),
      email: {
        type: DataTypes.STRING(100),
        unique: true,
        // validate: {
        //     isEmail: {
        //       msg: "Must be a valid email address",
        //     }
        // },
        allowNull: false
      },
      password: DataTypes.STRING(32),
      role: DataTypes.STRING(20),
    },
    {
      tableName: 'users',
      timestamps: false,
      underscored: true,
    },
  );

  User.associate = (models) => {
    User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'customer' });
    User.hasMany(models.Sale,
        { foreignKey: 'sellerId', as: 'seller' });
  };
  
    return User;
  };