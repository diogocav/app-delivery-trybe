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
      productsCart.push({ id, name, quantity: quantityProducts, price });
    } else {
      itemCart.quantity = quantityProducts;
    }
    localStorage.setItem('cart', JSON.stringify(productsCart));
  }, [quantityProducts, id, price, name]);

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
    <section key={ id } className="flex flex-col place-items-center h-full pt-2">
      <h3 data-testid={ `customer_products__element-card-title-${id}` }>
        {name.toUpperCase()}
      </h3>
      <img
        className="h-28"
        src={ urlImage }
        alt={ urlImage }
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <h3 data-testid={ `customer_products__element-card-price-${id}` }>
        R$
        {' '}
        {formattedPrice}
      </h3>
      <div
        className="flex place-content-center bg-lightYellow py-2
         border-black border-t-2 rounded"
      >
        <button
          className="border-black border-2 rounded w-1/6 text-center bg-darkYellow"
          type="button"
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          onClick={ () => removeProduct() }
        >
          -
        </button>
        <input
          className="border-black border-y-2 w-1/4 text-right"
          value={ quantityProducts }
          type="number"
          data-testid={ `customer_products__input-card-quantity-${id}` }
          onChange={ (e) => editProduct(e) }
        />
        <button
          className="border-black border-2 rounded w-1/6 text-center bg-darkYellow"
          type="button"
          data-testid={ `customer_products__button-card-add-item-${id}` }
          onClick={ () => addProduct() }
        >
          +
        </button>
      </div>
    </section>
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
