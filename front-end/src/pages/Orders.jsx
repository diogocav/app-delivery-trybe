import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
import fetchApi from '../services/fetchApi';

export default function Products() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    async function fetchSales() {
      const response = await fetchApi('GET', `orders/${data?.id}`, data?.token);
      setSales(response);
    }
    fetchSales();
  }, []);

  return (
    <div>
      <NavBar />
      <section className="flex flex-wrap gap-6 p-6 place-content-center">
        {sales.map((sale, index) => (
          <OrderCard
            key={ index }
            sale={ sale }
          />
        ))}
      </section>
    </div>
  );
}
