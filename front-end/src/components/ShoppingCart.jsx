import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function ShoppingCart() {
  const history = useHistory();
  const [valueProducts, setValueProducts] = useState(0);
  const { updatedValueProducts } = useContext(Context);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    const totalPrice = savedProducts
      .reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    setValueProducts(totalPrice);
  }, [updatedValueProducts]);

  return (
    <div className="text-center mx-10">
      <button
        className="w-1/3 h-16 bg-darkYellow border-black border-2"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ valueProducts === '0,00' }
        onClick={ () => history.push('/customer/checkout') }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          VER CARRINHO:
          {' '}
          <b>
            R$
            {' '}
            {valueProducts}
          </b>
        </span>
      </button>
    </div>
  );
}
