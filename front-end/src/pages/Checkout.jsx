import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import AdressForm from '../components/AdressForm';
import fetchApi from '../services/fetchApi';

export default function Checkout() {
  const [productsSale, setProductsSale] = useState([]);
  const [totalOrderPrice, setValueProducts] = useState(0);
  const [responsiblePerson, setResponsiblePerson] = useState('');
  const [adress, setAdress] = useState('');
  const [number, setNumber] = useState('');

  const history = useHistory();

  const handleClickRemoveItem = (name) => {
    const newProductsSale = productsSale.filter((product) => product.name !== name);
    setProductsSale(newProductsSale);
    const productsCart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemCart = productsCart.find((item) => item.name === name);
    itemCart.quantity = 0;
    localStorage.setItem('cart', JSON.stringify(productsCart));
  };

  const handleResponsiblePerson = ({ target }) => {
    setResponsiblePerson(target.value);
  };

  const handleAdress = ({ target }) => {
    setAdress(target.value);
  };

  const handleNumber = ({ target }) => {
    setNumber(target.value);
  };

  const handleClickFinishSale = async () => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const orderInfo = { responsiblePerson, adress, number };

    const result = await fetchApi(
      'POST',
      'orders',
      userInfo.token,
      { productsSale, orderInfo, userInfo, totalOrderPrice },
    );
    history.push(`/customer/orders/${result.id}`);

    localStorage.removeItem('cart');
    setProductsSale('');
  };

  useEffect(() => {
    const getProductsCart = JSON.parse(localStorage.getItem('cart')) || [];
    setProductsSale(getProductsCart);
  }, []);

  useEffect(() => {
    const totalPrice = productsSale
      .reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    setValueProducts(totalPrice);
  }, [productsSale]);

  return (
    <div className="flex flex-col place-items-center h-full">
      <NavBar />
      <h3 className="mt-8">FINALIZAR PEDIDO</h3>
      <table
        className="w-3/4 flex flex-col place-items-center place-content-center gap-6
       border-black border-2 rounded-md mt-2 py-6"
      >
        <thead className="flex w-full justify-between gap-4 px-4">
          <th className="w-16 text-center">ITEM</th>
          <th className="grow text-center">DESCRIÇÃO</th>
          <th className="w-16 text-center">QUANT.</th>
          <th className="w-16 text-center">UN.</th>
          <th className="w-16 text-center">TOTAL</th>
          <th className="w-28 text-center">REMOVER</th>
        </thead>
        <tbody className="w-full px-4">
          {productsSale.filter((product) => product.quantity !== 0)
            .map((product, index) => (
              <ProductRow
                key={ index }
                product={ product }
                index={ index }
                handleClickRemoveItem={ handleClickRemoveItem }
              />
            ))}
        </tbody>

        <h3
          className="border-black border rounded w-1/4 mx-4
          bg-darkYellow text-center"
          data-testid="customer_checkout__element-order-total-price"
        >
          TOTAL:
          {' '}
          <b>
            R$
            {' '}
            { totalOrderPrice }
          </b>
        </h3>
      </table>

      <AdressForm
        handleResponsiblePerson={ handleResponsiblePerson }
        setResponsiblePerson={ setResponsiblePerson }
        handleAdress={ handleAdress }
        handleNumber={ handleNumber }
      />

      <button
        className="border-black border rounded w-1/4 p-2 m-4 bg-darkYellow text-center"
        type="button"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleClickFinishSale }
      >
        FINALIZAR
      </button>
    </div>
  );
}
