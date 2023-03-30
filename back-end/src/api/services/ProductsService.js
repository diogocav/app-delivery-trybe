const { Product } = require('../../database/models');

const findAll = async () => {
  const products = await Product.findOne();
  
    return products;
  };

module.exports = {
    findAll,
};