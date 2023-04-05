import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import fetchApi from '../services/fetchApi';
// import Context from '../context/Context';

export default function OrdersDetail() {
  const [sales, setSales] = useState([]);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
  }, []);

  useEffect(() => {
    async function fetchSales() {
      const response = await fetchApi('GET', `orders/${userInfo?.id}`, userInfo?.token);
      setSales(response);
    }
    fetchSales();
  }, [userInfo]);

  return (
    <div>
      <NavBar />
      {sales.map((sale, index) => (
        <ProductRow
          key={ index }
          product={ sale }
          index={ index }
        />
      ))}
      ;
    </div>
  );
}
