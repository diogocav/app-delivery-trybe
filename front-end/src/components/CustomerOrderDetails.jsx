import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

export default function CustomerOrderDetails({ saleInfo }) {
  const [sellerName, setSellerName] = useState([]);
  const { id, status, saleDate, sellerId } = saleInfo;

  const getSellerName = async (Sellerid) => {
    const result = await fetchApi(
      'GET',
      `users/seller/${Sellerid}`,
    );
    console.log(result);
    setSellerName(result.name);
  };

  useEffect(() => {
    if (sellerId !== undefined) {
      getSellerName(sellerId);
    }
  }, [sellerId]);

  return (
    <header>
      <h2
        data-testid={ `customer_order_details__element-order-details-label-order-${id}` }
      >
        {id}
      </h2>

      <h2
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {sellerName}

      </h2>

      <h2
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {saleDate}

      </h2>
      <h2
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status${id}`
        }
      >
        {status}

      </h2>
      <button
        type="button"
        disabled
        data-testid="customer_order_details__button-delivery-check"
        // onClick={}
      >
        Marcar como entregue
      </button>
      {/*  <button
        type="button"
        // onClick={}
      >
        Marcar como entregue
      </button> */}
    </header>
  );
}

CustomerOrderDetails.propTypes = {
  saleInfo: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    sellerId: PropTypes.number,
  }).isRequired,
};
