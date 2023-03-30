const productsService = require('../services/ProductsService');

const getAll = async (req, res) => {
  const allProducts = await productsService.getAll();

  return res.status(201).json(allProducts);
};

module.exports = {
    getAll,
};
