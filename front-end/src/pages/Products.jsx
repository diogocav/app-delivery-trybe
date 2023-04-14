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
      <div className="flex flex-wrap gap-6 p-6 place-content-center">
        {products.map((product, index) => (
          <span
            key={ product.id }
            className="border-black border-2 rounded"
          >
            <ProductCard
              key={ product.id }
              product={ product }
              index={ index }
            />
          </span>
        ))}
      </div>
      <ShoppingCart />
    </div>
  );
}
