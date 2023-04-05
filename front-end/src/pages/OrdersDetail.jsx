import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import fetchApi from '../services/fetchApi';
// import Context from '../context/Context';

export default function OrdersDetail() {
  const [products, setproducts] = useState([]);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
  }, []);

  useEffect(() => {
    async function fetchproducts() {
      const response = await fetchApi('GET', `orders/${userInfo?.id}`, userInfo?.token);
      setproducts(response);
    }
    fetchproducts();
  }, [userInfo]);

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
