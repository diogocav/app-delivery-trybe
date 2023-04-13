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

  const allProductsSale = productsSale.map(async (product) => {
    saleService.createNewSaleProduct(newSale.id, product.id, product.quantity);
  });
  await Promise.all(allProductsSale);

   res.status(201).json({ id: newSale.id });
};

const getAllSalesById = async (req, res) => {
  const { role } = req;
  const { id } = req.params;
  
  const sales = await saleService.getAllSalesById(id, role);
  return res.status(200).json(sales);
};

const getSale = async (req, res) => {
  const { id } = req.params;
  
  const sale = await saleService.getSale(id);
  console.log(id);
  return res.status(200).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const newStatus = req.body.status;

  const updatedSale = await saleService.update(id, newStatus);

  if (updatedSale !== 0) return res.status(200).json({ message: 'Finished' });
  
  return res.status(500).json({ message: 'Unable to perform task' });
};

module.exports = {
    create,
    getAllSalesById,
    getSale,
    update,
};