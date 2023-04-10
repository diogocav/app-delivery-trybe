import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../helpers/formatNumbers';
import handleStatusChange from '../helpers/handleStatusChange';
import GetOrderStatus from '../helpers/GetOrderStatus';

export default function CustomerOrderDetails({ saleInfo, name }) {
  const { id, status, saleDate } = saleInfo;
  const [userInfo, setUserInfo] = useState();
  const [statusBack, setStatusBack] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
    console.log('dnadlksd', data);
    async function fetchData(token) {
      console.log(token);
      const updatedStatus = await GetOrderStatus(id, token);
      console.log(updatedStatus);
      setStatusBack(updatedStatus.status);
    }
    fetchData(data.token);
  }, [id]);

  // useEffect(() => {

  // }, [id, userInfo]);

  return (
    <header>
      <h2
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {id}
      </h2>

      <h2
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        {name}

      </h2>

      <h2
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        {
          saleDate ? formatDate(saleDate) : ''
        }
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
        disabled={ statusBack !== 'Em Trânsito' }
        data-testid="customer_order_details__button-delivery-check"
        onClick={ () => handleStatusChange(id, userInfo.token, 'Entregue') }
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
  name: PropTypes.string.isRequired,

};
