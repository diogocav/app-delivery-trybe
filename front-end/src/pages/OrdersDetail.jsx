// import React, { useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
// import fetchApi from '../services/fetchApi';
// import Context from '../context/Context';

export default function OrdersDetail() {
  // const { userInfo } = useContext(Context);
  // const { id, token } = userInfo;

  // useEffect(() => {
  //   async function fetchSales() {
  //     const response = await fetchApi('GET', `orders/${id}`, token);
  //     setSales(response);
  //   }
  //   fetchSales();
  // }, [id, token]);

  return (
    <div>
      <NavBar />
    </div>
  );
}
