import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
/* import { useState } from 'react'; */
/* import Context from '../context/Context';  */

const totalPrice = (itens) => {
  let total = 0;
  itens.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};

export default function ShoppingCart({ productCart }) {
  const history = useHistory();
  const total = totalPrice(productCart);
  console.log(total);
  return (

    <div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled
      >
        <span>
          {`Total: ${total}`}

        </span>
      </button>

      <button
        type="button"
        data-testid="customer_products__checkout-bottom-value"
        onClick={ () => history.push('/customer/checkout') }
      >
        checkout
      </button>
    </div>
  );
}

ShoppingCart.propTypes = {
  productCart: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.string,
      quantity: PropTypes.number,
    }).isRequired,
  ).isRequired,
};
