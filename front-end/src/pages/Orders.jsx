import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import fetchApi from '../services/fetchApi';
import Context from '../context/Context';

export default function Products() {
  const [sales, setSales] = useState([]);
  const { userInfo } = useContext(Context);
  const { id, token } = userInfo;

  useEffect(() => {
    async function fetchSales() {
      const response = await fetchApi('GET', `orders/${id}`, token);
      setSales(response);
    }
    fetchSales();
  }, [id, token]);

  return (
    <div>
      <NavBar />
      {sales.map((sale, index) => (
        <OrderCard
          key={ sale.id }
          sale={ sale }
          index={ index }
        />
      ))}
    </div>
  );
}
