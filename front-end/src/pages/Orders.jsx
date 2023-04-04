// import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import OrderCard from '../components/OrderCard';
// import fetchApi from '../services/fetchApi';

export default function Products() {
  // const [sales, setSales] = useState([]);

  // useEffect(() => {
  //   async function fetchProducts() {
  //     const response = await fetchApi('GET', 'sales', { userId }); --pegar o userId do localStorage??
  //     setSales(response);
  //   }
  //   fetchProducts();
  // }, []);

  return (
    <div>
      <NavBar />
      {/* {sales.map((sale, index) => (
        <OrderCard
          key={ sale.id }
          sale={ sale }
          index={ index }
        />
      ))} */}
      <OrderCard />
    </div>
  );
}
