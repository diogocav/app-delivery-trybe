import React, { useEffect, useState } from 'react';

export default function SellerOrderDetails(saleInfo) {
  const [seller, setSeller] = useState({});
  const { id, status, saleDate } = saleInfo;

  const getSeller = async (sellerId) => {
    const result = await fetchApi(
      'GET',
      `users/seller${sellerId}`,
    );
    setSeller(result);
  };

  useEffect(() => {
    const { sellerId } = saleInfo;
    getSeller(sellerId);
  }, []);

  return (
    <header>
      <h2>
        PEDIDO:
        {' '}
        {id}
      </h2>
      <h2>{seller.name}</h2>
      <h2>{saleDate}</h2>
      <h2>{status}</h2>
      <button
        type="button"
        // onClick={}
      >
        Preparar Pedido
      </button>
      <button
        type="button"
        // onClick={}
      >
        Saiu para Entrega
      </button>
    </header>
  );
}
