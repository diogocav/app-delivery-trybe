import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

function formatPrice(price) {
  return price.toString().replace('.', ',');
}

export default function ProductCard({ product }) {
  const { name, urlImage, price, id } = product;
  const { value, handleInputChange } = useContext(Context);
  const formattedPrice = formatPrice(price);
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
      >
        +

      </button>
      <input
        value={ value }
        type="number"
        data-testid={ `customer_products__input-card-quantity-${id}` }
        onChange={ handleInputChange }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${id}` }
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

// fazer fetch dos produtos que estão em produts no provider antes fazer o endpoint no back
