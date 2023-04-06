import React from 'react';
import PropTypes from 'prop-types';

export default function SellerOrderDetails({ saleInfo }) {
  const { id, status, saleDate } = saleInfo;

  return (
    <header>
      <h2
        data-testid={ `seller_order_details__element-order-details-label-order-${id}` }
      >
        {`Pedido ${id}`}
      </h2>
      <h2
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {saleDate}

      </h2>
      <h2
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {status}

      </h2>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        // onClick={}
      >
        Preparar Pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        disabled
        type="button"
        // onClick={}
      >
        Saiu para Entrega
      </button>
    </header>
  );
}

SellerOrderDetails.propTypes = {
  saleInfo: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
  }).isRequired,
};
