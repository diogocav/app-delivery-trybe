import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function OrderCard({ sale }) {
  const history = useHistory();
  const path = history.location.pathname;
  const [dataTestIdUser, setDataTestIdUser] = useState();

  useEffect(() => {
    const pathName = () => {
      if (path.includes('customer')) setDataTestIdUser('customer');
      if (path.includes('seller')) setDataTestIdUser('seller');
    };
    pathName();
  }, [path]);

  function formatPrice(price) {
    return price.toString().replace('.', ',');
  }
  function formatDate(date) {
    const regex = /^(\d{4})-(\d{2})-(\d{2}).*$/;
    const match = regex.exec(date);
    const formattedDate = `${match[3]}/${match[2]}/${match[1]}`;
    return formattedDate;
  }
  const { id, status, saleDate, totalPrice } = sale;
  const formattedPrice = formatPrice(totalPrice);
  const formattedDate = formatDate(saleDate);

  function handleCardButtonClick() {
    history.push(`/customer/orders/${id}`);
  }

  return (
    <button
      type="button"
      onClick={ handleCardButtonClick }
    >
      <h3 data-testid={ `${dataTestIdUser}_orders__element-order-id-${id}` }>
        { `Pedido: ${id}` }
      </h3>
      <h2 data-testid={ `${dataTestIdUser}_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h3 data-testid={ `${dataTestIdUser}_orders__element-order-date-${id}` }>
        { formattedDate }
      </h3>
      <h3 data-testid={ `${dataTestIdUser}_orders__element-card-price-${id}` }>
        { formattedPrice }
      </h3>
    </button>
  );
}

OrderCard.propTypes = {
  sale: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
