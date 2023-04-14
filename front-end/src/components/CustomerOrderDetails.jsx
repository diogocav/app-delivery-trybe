import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { useHistory } from 'react-router-dom';
import { formatDate } from '../helpers/formatNumbers';
import handleStatusChange from '../helpers/handleStatusChange';
import GetOrderStatus from '../helpers/GetOrderStatus';

export default function CustomerOrderDetails({ saleInfo, name }) {
  const { id, saleDate } = saleInfo;
  // const history = useHistory();
  const [userInfo, setUserInfo] = useState();
  const [statusBack, setStatusBack] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
    // console.log('dnadlksd', data);

    async function fetchData(token) {
      // console.log(token);
      const updatedStatus = await GetOrderStatus(id, token);
      // console.log(updatedStatus);
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
    // history.push('/customer/orders');
  }

  return (
    <header
      className="flex flex-wrap gap-5 p-6 place-content-center
        border-black border-2 rounded-md mt-2"
    >
      <h2
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        {`Pedido ${id}`}
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
        {statusBack}

      </h2>
      <button
        data-testid="customer_order_details__button-delivery-check"
        className="border-black border-2 rounded w-1/6 text-center bg-darkYellow"
        type="button"
        disabled={ statusBack !== 'Em Trânsito' }
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Entregue') }
        onClick={ () => reload('Entregue') }
      >
        Pedido Recebido
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
  name: PropTypes.string,
};

CustomerOrderDetails.defaultProps = {
  name: '',
};
