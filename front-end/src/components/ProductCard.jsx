import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function formatPrice(price) {
  return price.toString().replace('.', ',');
}

export default function ProductCard({ product }) {
  const { name, urlImage, price, id } = product;
  const [quantityProducts, setQuantityProducts] = useState(0);
  const { setUpdatedValueProducts } = useContext(Context);
  const formattedPrice = formatPrice(price);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCart = savedProducts.find((item) => item.id === id);
    if (itemCart) {
      const { quantity } = itemCart;
      setQuantityProducts(quantity);
    }
  }, [id]);

  useEffect(() => {
    const productsCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCart = productsCart.find((item) => item.id === id);
    if (!itemCart) {
      productsCart.push({ id, quantity: quantityProducts, price });
    } else {
      itemCart.quantity = quantityProducts;
    }
    localStorage.setItem('cart', JSON.stringify(productsCart));
  }, [quantityProducts, id, price]);

  function addProduct() {
    setQuantityProducts((prevQtd) => +prevQtd + 1);
    setUpdatedValueProducts((prevQtd) => !prevQtd);
  }

  function removeProduct() {
    if (quantityProducts !== 0) {
      setQuantityProducts((prevQtd) => +prevQtd - 1);
      setUpdatedValueProducts((prevQtd) => !prevQtd);
    }
  }

  function editProduct({ target }) {
    const { value } = target;
    if (value >= 0) {
      setQuantityProducts(value);
      setUpdatedValueProducts((prevQtd) => !prevQtd);
    }
  }

  return (
    <div key={ id }>
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>
        {name}
      </h3>
      <img
        src={ urlImage }
        alt={ urlImage }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        style={ { width: '200px', height: '150px' } }
      />
      <h3 data-testid={ `customer_products__element-card-price-${id}` }>
        {formattedPrice}
      </h3>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
        onClick={ () => addProduct() }
      >
        +

      </button>
      <input
        value={ quantityProducts }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ (e) => editProduct(e) }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => removeProduct() }
      >
        -

      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};
