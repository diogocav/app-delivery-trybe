import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import fetchApi from '../services/fetchApi';

export default function OrdersDetail() {
  const [products, setproducts] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();
  const path = history.location.pathname;
  const pathArray = path.split('/');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
    console.log(userInfo.token);
  }, []);

  useEffect(() => {
    async function fetchproducts() {
      const response = await fetchApi(
        'GET',
        `orders/details/${pathArray[3]}`,
        userInfo?.token,
      );
      setproducts(response);
    }
    fetchproducts();
  }, [userInfo, pathArray]);

  return (
    <div>
      <NavBar />
      {products.map((product, index) => (
        <ProductRow
          key={ index }
          product={ product }
          index={ index }
        />
      ))}
      ;
    </div>
  );
}
