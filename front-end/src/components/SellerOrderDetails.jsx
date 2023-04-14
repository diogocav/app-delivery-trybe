import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import handleStatusChange from '../helpers/handleStatusChange';
import { formatDate } from '../helpers/formatNumbers';
import GetOrderStatus from '../helpers/GetOrderStatus';

export default function SellerOrderDetails({ saleInfo }) {
  const { id, saleDate } = saleInfo;
  const [userInfo, setUserInfo] = useState();
  const [statusBack, setStatusBack] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);

    async function fetchData(token) {
      const updatedStatus = await GetOrderStatus(id, token);
      // console.log(updatedStatus, id);
      setStatusBack(updatedStatus.status);
    }

    if (id) fetchData(data.token);
  }, [id]);

  useEffect(() => {
  }, [statusBack]);

  async function reload(stattus) {
    handleStatusChange(id, userInfo.token, stattus);
    const updatedStatus = await GetOrderStatus(id, userInfo.token);
    setStatusBack(updatedStatus.status);
  }

  return (
    <header
      className="flex flex-wrap gap-5 p-6 place-content-center
        border-black border-2 rounded-md mt-2"
    >
      <h2
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {`Pedido ${id}`}
      </h2>
      <h2
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {
          saleDate ? formatDate(saleDate) : ''
        }

      </h2>
      <h2
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {statusBack}

      </h2>
      <button
        data-testid="seller_order_details__button-preparing-check"
        className="border-black border-2 rounded w-1/6 text-center bg-darkYellow"
        type="button"
        disabled={ statusBack !== 'Pendente' }
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Preparando') }
        onClick={ () => reload('Preparando') }
      >
        Preparar Pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        className="border-black border-2 rounded w-1/6 text-center bg-darkYellow"
        type="button"
        disabled={ statusBack !== 'Preparando' }
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Em Trânsito') }
        onClick={ () => reload('Em Trânsito') }
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
