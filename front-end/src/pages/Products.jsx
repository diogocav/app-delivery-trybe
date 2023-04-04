import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import fetchApi from '../services/fetchApi';
import ShoppingCart from '../components/ShoppingCart';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetchApi('GET', 'products');

      setProducts(response);
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <NavBar />

      {products.map((product, index) => (
        <ProductCard
          key={ product.id }
          product={ product }
          index={ index }

        />
      ))}
      <ShoppingCart />
    </div>
  );
}
