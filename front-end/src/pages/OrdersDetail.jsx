import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import fetchApi from '../services/fetchApi';
import CustomerOrderDetails from '../components/CustomerOrderDetails';
import SellerOrderDetails from '../components/SellerOrderDetails';

export default function OrdersDetail() {
  const [productsArray, setproductsArray] = useState([]);
  const [saleInfo, setSaleInfo] = useState({});
  const [userInfo, setUserInfo] = useState();
  const history = useHistory();
  const path = history.location.pathname;
  const pathArray = path.split('/');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user')) || '';
    setUserInfo(data);
  }, []);

  useEffect(() => {
    async function fetchproducts() {
      const response = await fetchApi(
        'GET',
        `orders/details/${pathArray[3]}`,
        userInfo.token,
      );
      const { products } = response;
      setSaleInfo(response);
      setproductsArray(products);
    }

    if (userInfo !== undefined) {
      fetchproducts();
    }
  }, [userInfo, pathArray]);

  return (
    <div>
      <NavBar />
      {
        pathArray[1] === 'seller'
          ? <CustomerOrderDetails sale={ saleInfo } />
          : <SellerOrderDetails sale={ saleInfo } />
      }
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>SubTotal</th>
            <th>Remover Item</th>
          </tr>
        </thead>
        <tbody>
          {productsArray.map((product, index) => {
            const { SaleProduct: { quantity }, name, price } = product;
            const productDetails = {
              name,
              price,
              quantity,
            };
            return (
              <ProductRow
                key={ index }
                product={ productDetails }
                index={ index }
              />
            );
          })}
        </tbody>
      </table>

    </div>
  );
}
