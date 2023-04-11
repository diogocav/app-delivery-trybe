import fetchApi from '../services/fetchApi';

export default async function GetOrderStatus(saleId, token) {
  const response = await fetchApi(
    'GET',
    `sale/details/${saleId}`,
    token,
  );
  return response;
}
