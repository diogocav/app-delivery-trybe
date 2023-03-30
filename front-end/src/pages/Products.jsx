import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import productsgetAllFetch from '../services/productsFetch';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await productsgetAllFetch();
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
    </div>
  );
}
// fazer fetch dos produtos que estão em produts no provider antes fazer o endpoint no back
