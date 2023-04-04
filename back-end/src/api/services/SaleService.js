const { Sale } = require('../../database/models');

const create = async ({
    userId,
    sellerId,
    totalPrice,
    deliveryAdress,
    deliveryNumber,
    saleDate,
}) => {
    const { dataValues } = await Sale.create({
        userId,
        sellerId,
        totalPrice,
        deliveryAdress,
        deliveryNumber,
        saleDate,
        status: 'Pendente',
      });

  return dataValues;
};

module.exports = {
    create,
};