import React from 'react';
import PropTypes from 'prop-types';

export default function ProductRow({ product, index, handleClickRemoveItem }) {
  const { name, quantity, price } = product;

  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {+index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {+quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        {price.toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {(+price * +quantity).toFixed(2)
          .toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        <button
          type="button"
          onClick={ () => handleClickRemoveItem(name) }
        >
          Remover
        </button>
      </td>
    </tr>
  );
}

ProductRow.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  handleClickRemoveItem: PropTypes.func.isRequired,
};
