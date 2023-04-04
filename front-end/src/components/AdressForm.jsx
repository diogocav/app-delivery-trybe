import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

export default function AdressForm({ handleResponsiblePerson,
  handleAdress,
  handleNumber }) {
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    const result = await fetchApi(
      'GET',
      'users/seller',
      
    );
    console.log(result);
    setSellers(result);
  };

  useEffect(() => {
    getSellers();
  }, []);

  return (
    <form action="">
      <label htmlFor="responsiblePerson">
        Pessoa Responsável:
        <select
          name="responsiblePerson"
          id="responsiblePerson"
          onChange={ handleResponsiblePerson }
          data-testid="customer_checkout__select-seller"
        >
          {
            sellers
              .map((seller) => (
                <option value={ seller.id } key={ seller.id }>
                  {seller.name}
                </option>))
          }
        </select>
      </label>
      <label htmlFor="adress">
        Endereço:
        <input
          type="text"
          id="adress"
          name="adress"
          onChange={ handleAdress }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number">
        Número
        <input
          type="text"
          id="number"
          name="number"
          onChange={ handleNumber }
          data-testid="customer_checkout__input-address-number"
        />
      </label>
    </form>
  );
}

AdressForm.propTypes = {
  handleResponsiblePerson: PropTypes.func.isRequired,
  handleAdress: PropTypes.func.isRequired,
  handleNumber: PropTypes.func.isRequired,
};
