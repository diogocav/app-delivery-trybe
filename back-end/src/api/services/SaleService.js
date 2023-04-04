const { Sale } = require('../../database/models');
const { SaleProduct } = require('../../database/models');

const createNewSale = async ({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
}) => {
    const finalPrice = +totalPrice.toString()
    .replace(',', '.');
    const { dataValues } = await Sale.create({
        userId,
        sellerId,
        totalPrice: finalPrice,
        deliveryAddress,
        deliveryNumber,
        status: 'Pendente',
    });
    
  return dataValues;
};

const createNewSaleProduct = async (saleId, productId, quantity) => {
    await SaleProduct.create({
        saleId,
        productId,
        quantity,
    });
};

module.exports = {
    createNewSale,
    createNewSaleProduct,
};