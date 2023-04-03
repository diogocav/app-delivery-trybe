import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';

export default function ShoppingCart() {
  const history = useHistory();
  const [valueProducts, setValueProducts] = useState(0);
  console.log(valueProducts);
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
    <div>
      <button
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ valueProducts === '0,00' }
        onClick={ () => history.push('/customer/checkout') }
      >
        <span data-testid="customer_products__checkout-bottom-value">
          {valueProducts}

        </span>
      </button>
    </div>
  );
}
