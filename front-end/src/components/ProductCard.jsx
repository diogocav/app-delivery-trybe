import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function formatPrice(price) {
  return price.toString().replace('.', ',');
}

export default function ProductCard({ product }) {
  const { name, urlImage, price, id } = product;
  const [totalProducts, setTotalProducts] = useState(0);
  const { value, handleInputChange } = useContext(Context);
  const [productsCart, setProductsCart] = useState([]);
  /*  const [totalPrice, setTotalPrice] = useState(0); */
  const formattedPrice = formatPrice(price);

  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem('cart')) || [];
    setProductsCart(savedProducts);
  }, []);

  function addProduct(idItem) {
    const copyProducts = [...productsCart];
    const itemCart = copyProducts.find((item) => item.id === idItem);
    if (!itemCart) {
      copyProducts.push({ id: idItem, quantity: 1 });
    } else {
      itemCart.quantity += 1;
    }
    setProductsCart(copyProducts);
    setTotalProducts((prevQtd) => prevQtd + 1);
    localStorage.setItem('cart', JSON.stringify([...copyProducts, productsCart]));
  }

  function removeProduct(idItem) {
    const copyProducts = [...productsCart];
    const itemCart = copyProducts.find((item) => item.id === idItem);
    if (itemCart.quantity === 0) {
      return itemCart;
    }
    if (itemCart.quantity > 1) {
      itemCart.quantity -= 1;
      setProductsCart([copyProducts]);
    } else {
      const arrayFiltered = copyProducts.filter((itens) => itens.id !== idItem);
      setProductsCart(arrayFiltered);
    }
    setTotalProducts((prevQtd) => prevQtd - 1);
    localStorage.setItem('cart', JSON.stringify([...copyProducts, productsCart]));
  }

  /*   function clearCart() {
    setProductsCart([]);
  }
 */
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
        onClick={ () => addProduct(id) }
      >
        +

      </button>
      <input
        value={ totalProducts }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ () => handleInputChange(value) }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onClick={ () => removeProduct(id) }
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
