const { Op } = require('sequelize');
const { Sale, SaleProduct, Product } = require('../../database/models');

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

const getAllSales = async (id, role) => {
    if (role === 'customer') {
        const sales = await Sale.findAll({
            where: { userId: id },
          });    
          return sales;
    }
    if (role === 'seller') {
        const sales = await Sale.findAll({
            where: { sellerId: id },
          });    
          return sales;
    }
};

const getSale = async (id) => {
    const sale = await Sale.findOne({
        where: { id },
        include: [
          {
            model: Product,
            as: 'products',
            attributes: ['name', 'price'],
            through: {
              model: SaleProduct,
              attributes: ['quantity'],
              where: { quantity: {
                [Op.gt]: 0, 
              } },
            },
          },
        ],
    }); 
    return sale;
};

module.exports = {
    createNewSale,
    createNewSaleProduct,
    getAllSales,
    getSale,
};