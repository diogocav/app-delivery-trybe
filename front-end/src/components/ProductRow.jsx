import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function ProductRow({ product, index, handleClickRemoveItem = () => {} }) {
  const [dataIdUser, setDataIdUser] = useState('');
  const [dataTestidPage, setDataTestidPage] = useState('');
  const { name, quantity, price } = product;
  const history = useHistory();
  const path = history.location.pathname;

  useEffect(() => {
    const pathName = () => {
      if (path.includes('customer')) setDataIdUser('customer');
      if (path.includes('seller')) setDataIdUser('seller');

      const pageTestId = path === `/${dataIdUser}/checkout`
        ? 'checkout'
        : 'order_details';

      setDataTestidPage(pageTestId);
    };
    pathName();
  }, [path, dataIdUser]);

  return (
    <tr
      className="flex justify-between place-items-center gap-4 bg-lightYellow
      border-black border-t-2 border-b-2 rounded mt-2"
    >
      <td
        className="border-black border-x-2 rounded w-16 text-center bg-darkYellow"
        data-testid={
          `${dataIdUser}_${dataTestidPage}__element-order-table-item-number-${index}`
        }
      >
        {+index + 1}
      </td>
      <td
        className="grow"
        data-testid={
          `${dataIdUser}_${dataTestidPage}__element-order-table-name-${index}`
        }
      >
        {name}
      </td>
      <td
        className="w-16 text-center"
        data-testid={
          `${dataIdUser}_${dataTestidPage}__element-order-table-quantity-${index}`
        }
      >
        {+quantity}
      </td>
      <td
        className="w-16 text-center"
        data-testid={
          `${dataIdUser}_${dataTestidPage}__element-order-table-unit-price-${index}`
        }
      >
        {price.toString()
          .replace('.', ',')}
      </td>
      <td
        className="w-16 text-center"
        data-testid={
          `${dataIdUser}_${dataTestidPage}__element-order-table-sub-total-${index}`
        }
      >
        {(+price * +quantity).toFixed(2)
          .toString()
          .replace('.', ',')}
      </td>
      { path === '/customer/checkout'
      && (
        <td
          className="w-28 text-center border-black border-x-2 rounded bg-darkYellow"
          data-testid={
            `${dataIdUser}_${dataTestidPage}__element-order-table-remove-${index}`
          }
        >
          <button
            type="button"
            onClick={ () => handleClickRemoveItem(name) }
          >
            Remover
          </button>
        </td>)}
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
