import React from 'react';

export default function SellerOrderDetails(saleInfo) {
  const { id, status, saleDate } = saleInfo;

  return (
    <header>
      <h2>
        PEDIDO:
        {' '}
        {id}
      </h2>
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
