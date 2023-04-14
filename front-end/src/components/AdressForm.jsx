import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';

export default function AdressForm({ handleResponsiblePerson,
  handleAdress,
  handleNumber,
  setResponsiblePerson }) {
  const [sellers, setSellers] = useState([]);

  const getSellers = async () => {
    const result = await fetchApi(
      'GET',
      'users/seller',
    );
    setSellers(result);
  };

  useEffect(() => {
    getSellers();
  }, []);

  useEffect(() => {
    setResponsiblePerson(sellers[0]?.id);
  }, [sellers, setResponsiblePerson]);

  return (
    <form
      action=""
      className="w-3/4 flex place-items-center
    border-black border-2 rounded-md mt-2 py-6 px-4 gap-4"
    >
      <label
        htmlFor="responsiblePerson"
        className=" flex flex-col w-1/4"
      >
        Responsável:
        <select
          className="border-black border rounded p-px"
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
      <label htmlFor="adress" className="grow">
        Endereço:
        <input
          className=" flex flex-col border-black border rounded w-full"
          type="text"
          id="adress"
          name="adress"
          onChange={ handleAdress }
          data-testid="customer_checkout__input-address"
        />
      </label>
      <label htmlFor="number" className="flex flex-col w-1/6">
        Número:
        <input
          className="border-black border rounded"
          type="number"
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
  setResponsiblePerson: PropTypes.func.isRequired,
};
