import React from 'react';
import PropTypes from 'prop-types';

export default function OrderCard({ order }) {
  function formatPrice(price) {
    return price.toString().replace('.', ',');
  }
  const { id, status, date, price } = order;
  const formattedPrice = formatPrice(price);

  return (
    <button type="button">
      <h3 data-testid={ `customer_orders__element-order-id-${id}` }>
        { `Pedido: ${id}` }
      </h3>
      <h2 data-testid={ `customer_orders__element-delivery-status-${id}` }>
        { status }
      </h2>
      <h3 data-testid={ `customer_orders__element-order-date-${id}` }>
        { date }
      </h3>
      <h3 data-testid={ `customer_orders__element-card-price-${id}` }>
        { formattedPrice }
      </h3>
    </button>
  );
}

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.string,
  }).isRequired,
};
