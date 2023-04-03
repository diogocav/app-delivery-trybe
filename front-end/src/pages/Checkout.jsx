import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import ProductRow from '../components/ProductRow';
import AdressForm from '../components/AdressForm';
// import ProductContext from '../context/ProductContext';

export default function Checkout() {
//   const {
//     productsSale,
//     handleClickRemoveItem,
//     handleClickFinshSale,
//     responsiblePerson,
//     adress,
//     number,
//     handleResponsiblePerson,
//     handleAdress,
//     handleNumber,
//   } = useContext(ProductContext);

  const [productsSale, setProductsSale] = useState([]);
  const [totalOrderPrice, setValueProducts] = useState(0);

  useEffect(() => {
    const getProductsCart = JSON.parse(localStorage.getItem('cart')) || [];
    setProductsSale(getProductsCart);
    const totalPrice = getProductsCart
      .reduce((acc, curr) => acc + (curr.price * curr.quantity), 0)
      .toFixed(2)
      .toString()
      .replace('.', ',');
    setValueProducts(totalPrice);
  }, []);

  return (
    <div>
      <NavBar />
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
          {productsSale.map((product, index) => (
            <ProductRow
              key={ index }
              product={ product }
              index={ index }
            />
          ))}
        </tbody>
      </table>

      <h3
        data-testid="customer_checkout__element-order-total-price"
      >
        {
          totalOrderPrice
        }

      </h3>

      <AdressForm
        handleResponsiblePerson={ handleResponsiblePerson }
        handleAdress={ handleAdress }
        handleNumber={ handleNumber }
      />

      <button
        type="button"
        // onClick={
        //   () => handleClickFinshSale(productsSale, responsiblePerson, adress, number)
        // }
      >
        Finalizar
      </button>
    </div>
  );
}
