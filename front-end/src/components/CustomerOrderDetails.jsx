import React from 'react';
import PropTypes from 'prop-types';
import { formatDate } from '../helpers/formatNumbers';
// import fetchApi from '../services/fetchApi';
// import handleStatusChange from '../helpers/handleStatusChange';
/* import { formatDate } from '../helpers/formatNumbers';  */

export default function CustomerOrderDetails({ saleInfo, name }) {
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
        disabled
        data-testid="customer_order_details__button-delivery-check"
        // onClick={ () => handleStatusChange(id, userInfo.token, 'Entregue') }
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
