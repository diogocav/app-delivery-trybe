import React from 'react';
import PropTypes from 'prop-types';

// export default function ProductRow(product, index, handleClickRemoveItem) {
export default function ProductRow({ product, index }) {
  const { name, quantity, price } = product;
  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index}
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
        {price}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {+price * +quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        {/* <button
          type="button"
          onClick={ () => handleClickRemoveItem(name) }
        >
          Remover
        </button> */}
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
};
