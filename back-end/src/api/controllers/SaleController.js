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

const getById = async (req, res) => {
  const { role } = req;
  const { id } = req.params;
  
  const sales = await saleService.getAllSales(id, role);
  return res.status(200).json(sales);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  
  const sale = await saleService.getSale(id);
  return res.status(200).json(sale);
};

module.exports = {
    create,
    getById,
    getSale,
};