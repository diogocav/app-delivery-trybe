import React from 'react';
import PropTypes from 'prop-types';
// import handleStatusChange from '../helpers/handleStatusChange';
// import fetchApi from '../services/fetchApi';
import { formatDate } from '../helpers/formatNumbers';

export default function SellerOrderDetails({ saleInfo }) {
  const { id, status, saleDate } = saleInfo;
  // const [userInfo, setUserInfo] = useState();

  // async function handleStatusChange(saleId, token, newStatus) {
  //   const response = await fetchApi(
  //     'PUT',
  //     `sale/${saleId}`,
  //     token,
  //     { status: newStatus },
  //   );
  //   return response;
  // }

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem('user')) || '';
  //   setUserInfo(data);
  // }, []);

  return (
    <header>
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
        {status}

      </h2>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Preparando') }
      >
        Preparar Pedido
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        disabled
        type="button"
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Em Trânsito') }
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
