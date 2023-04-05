import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function ProductRow({ product, index, handleClickRemoveItem = () => {} }) {
  const [dataTestIdUser, setDataTestIdUser] = useState('');
  const [dataTestidPage, setDataTestidPage] = useState('');
  const { name, quantity, price } = product;
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const pathName = () => {
      if (path.includes('customer')) setDataTestIdUser('customer');
      if (path.includes('seller')) setDataTestIdUser('seller');

      const pageTestId = path === `/${dataTestIdUser}/checkout`
        ? 'checkout'
        : 'order_details';

      setDataTestidPage(pageTestId);
    };
    pathName();
  }, [path, dataTestIdUser]);
  return (
    <tr>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-item-number-${index}`
        }
      >
        {+index + 1}
      </td>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-name-${index}`
        }
      >
        {name}
      </td>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-quantity-${index}`
        }
      >
        {+quantity}
      </td>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-unit-price-${index}`
        }
      >
        {price.toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-sub-total-${index}`
        }
      >
        {(+price * +quantity).toFixed(2)
          .toString()
          .replace('.', ',')}
      </td>
      <td
        data-testid={
          `${dataTestIdUser}_${dataTestidPage}__element-order-table-remove-${index}`
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
  handleClickRemoveItem: PropTypes.func,
};

ProductRow.defaultProps = {
  handleClickRemoveItem: () => {},
};
