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
  const [totalPrice, setTotalPrice] = useState(0);
  const [userInfo] = useState(JSON
    .parse(localStorage.getItem('user')) || '');
  const [sellerName, setSellerName] = useState('');
  const history = useHistory();
  const path = history.location.pathname;
  const pathArray = path.split('/');

  function getTotalOrderValue(products) {
    const total = products
      .reduce((acc, curr) => {
        const { SaleProduct: { quantity }, price } = curr;
        return acc + (price * quantity);
      }, 0)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    setTotalPrice(total);
  }

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
      getTotalOrderValue(products);
    }

    if (userInfo !== undefined) {
      fetchproducts();
    }
  }, [userInfo]);

  useEffect(() => {
    async function getSellerName({ sellerId }) {
      const result = await fetchApi(
        'GET',
        `users/seller/${sellerId}`,
      );
      setSellerName(result?.name);
    }
    if (saleInfo !== undefined) {
      getSellerName(saleInfo);
    }
  }, [saleInfo]);

  return (
    <div className="flex flex-col place-items-center h-full gap-10">
      <NavBar />
      <div className="w-3/4 place-items-center place-content-center">
        {
          pathArray[1] === 'customer' ? <CustomerOrderDetails
            saleInfo={ saleInfo }
            name={ sellerName }
            index={ saleInfo.index }
          />
            : <SellerOrderDetails saleInfo={ saleInfo } index={ saleInfo.index } />
        }
      </div>
      <table
        className="w-3/4 flex flex-col place-items-center place-content-center gap-6
      border-black border-2 rounded-md mt-2 py-6"
      >
        <thead className="flex w-full justify-between gap-4 px-4">
          <th className="w-16 text-center">ITEM</th>
          <th className="grow text-center">DESCRIÇÃO</th>
          <th className="w-16 text-center">QUANT</th>
          <th className="w-16 text-center">UN</th>
          <th className="w-16 text-center">TOTAL</th>
        </thead>
        <tbody className="w-full px-4">
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
        <h3
          data-testid={ `${pathArray[1]}_order_details__element-order-total-price` }
          className="flex border-black border rounded w-1/4 h-10 mx-4 place-items-center
          place-content-center bg-darkYellow"
        >
          TOTAL:
          {' '}
          <b>
            R$
            {' '}
            {totalPrice}
          </b>
        </h3>
      </table>
    </div>
  );
}
