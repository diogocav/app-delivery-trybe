import React from 'react';
import PropTypes from 'prop-types';

export default function ProductRow({ handleResponsiblePerson,
  handleAdress,
  handleNumber }) {
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
          <option value="fulana">Fulana</option>
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

ProductRow.propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.string,
      quantity: PropTypes.number,
    }).isRequired,
    index: PropTypes.number.isRequired,
  };