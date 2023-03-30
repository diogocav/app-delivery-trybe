import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function Products({ product }) {
  const { name, urlImage, price, id } = product;
  const { value, handleInputChange } = useContext(Context);
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
        {price}
      </h3>
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${id}` }
      >
        +

      </button>
      <input
        value={ value }
        type="number"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        onChange={ handleInputChange }
      />
      <button
        type="button"
        data-testid={ `customer_products__input-card-quantity-${id}` }
      >
        -

      </button>
    </div>
  );
}

Products.propTypes = {
  product: PropTypes.objectOf({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    urlImage: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

// fazer fetch dos produtos que estão em produts no provider antes fazer o endpoint no back
