import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function ProductRow({ product, index, handleClickRemoveItem = '' }) {
  const { name, quantity, price } = product;
  const history = useHistory();
  const path = history.location.pathname;
  let dataTestidPage = '';
  let dataTestidUser = '';

  const pathName = () => {
    if (path.includes('customer')) dataTestidUser = 'customer';
    if (path.includes('seller')) dataTestidUser = 'seller';
    if (path.includes('admin')) dataTestidUser = 'admin';

    dataTestidPage = path === `/${dataTestidUser}/checkout`
      ? 'checkout'
      : 'order_details';
  };

  useEffect(() => {
    pathName();
  }, []);
  return (
    <tr>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-item-number-${index}`
        }
      >
        {+index + 1}
      </td>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-name-${index}`
        }
      >
        {name}
      </td>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-quantity-${index}`
        }
      >
        {+quantity}
      </td>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-unit-price-${index}`
        }
      >
        {price.toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-sub-total-${index}`
        }
      >
        {(+price * +quantity).toFixed(2)
          .toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={
          `${dataTestidUser}_${dataTestidPage}__element-order-table-remove-${index}`
        }
      >
        { path === '/customer/checkout'
      && (
        <button
          type="button"
          onClick={ () => handleClickRemoveItem(name) }
        >
          Remover
        </button>)}
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
