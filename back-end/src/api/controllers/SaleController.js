const create = async (req, res) => 
  // const { productsSale, orderInfo } = req.body;

  // await saleService.create(saleId, productId, quantity);

   res.status(201).json({ message: 'order registered' });
module.exports = {
    create,
};