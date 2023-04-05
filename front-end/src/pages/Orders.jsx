import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import fetchApi from '../services/fetchApi';

export default function Products() {
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

  console.log(sales);

  return (
    <div>
      <NavBar />
      {sales.map((sale, index) => (
        <OrderCard
          key={ index }
          sale={ sale }
        />
      ))}
    </div>
  );
}
