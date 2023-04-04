const saleService = require('../services/SaleService');
// const userService = require('../services/UserService');

const create = async (req, res) => {
  const { productsSale, orderInfo, userInfo, totalOrderPrice } = req.body;

  const newSaleInfo = {
    userId: userInfo.id,
    sellerId: orderInfo.responsiblePerson,
    totalPrice: totalOrderPrice,
    deliveryAddress: orderInfo.adress,
    deliveryNumber: orderInfo.number,
  };

  const newSale = await saleService.createNewSale(newSaleInfo);

  const allProductsSale = await productsSale.map(async (product) => {
    await saleService.createNewSaleProduct(newSale.id, product.id, product.quantity);
  });
  Promise.all(allProductsSale);

   res.status(201).json({ id: newSale.id });
};

module.exports = {
    create,
};